// all routes in this file!

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', async(req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

// GET one blog
blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(400).end()
  }
})

// PUT, update likes
blogsRouter.put('/:id', async(request, response) => {
  const { author, title, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { author, title, url, likes }, { new:true, runValidators:true, context:'query' })
  response.json(updatedBlog)
})

// POST, create new blog to the list
blogsRouter.post('/', async(request, response) => {
  const body = request.body

  console.log('The token', request.token)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  console.log('user',user)
  
  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user.id
  })

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  }
  else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
    console.log(savedBlog)
  }
})

// DELETE, delete blog by id
blogsRouter.delete('/:id', async(request, response) => {
  /* (route for: anyone can delete blogs:)
  const blogToDelete = await Blog.findByIdAndRemove(request.params.id)
  console.log('deleted', blogToDelete)
  response.status(204).end()
  */
  const blogtoDelete = await Blog.findById(request.params.id) // searching the blog from db with request id
  console.log('BLOG TO DELETE', blogtoDelete)

  const decodedToken = jwt.verify(request.token, process.env.SECRET) // finding out if someone is logged in
  console.log('TOKEN', decodedToken)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' }) // give error message if not logged in
  }
  const user = await User.findById(decodedToken.id) // finding the right user from db
  console.log('USER', user)

  if ( blogtoDelete.user.toString() === user.id.toString() ) { // if collections' identifiers match...
    await Blog.findByIdAndDelete(request.params.id) // ...the blog is to be deleted (from Phonebook.blogs collection)
    console.log('deleted', blogtoDelete)
    response.status(204).end()
  } else { // if collections' identifiers dont match blog is not deleted from db
    return response.status(401).json({ error: 'You are not able to delete this blog. This blog is added by some other user.'})
  } // PROBLEM: everything is deleted correctly but if you check from mongoDB, every deleted blog id is still stored to Phonebook.users blogs -array as ObjectIds
})

module.exports = blogsRouter