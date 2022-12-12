// all routes in this file!

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

  const user = await User.findById("6396d7b454b16ac32bfd97c7")
  // const user = await User.findById(body.userId)
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
  const blogToDelete = await Blog.findByIdAndRemove(request.params.id)
  console.log('deleted', blogToDelete)
  response.status(204).end()
})

module.exports = blogsRouter