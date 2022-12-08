// all routes in this file!

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middlew = require('../utils/middleware')

// GET all blogs
blogsRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// GET one blog
blogsRouter.get('/:id', async(request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  
  try {
    if (blog) {
      response.json(blog)
    }
  } catch(error) {
    console.log('ERROR', error, 'RESPONSE', response)
    response.status(400).end()
    next(error)
  }    
})

// PUT, update likes
blogsRouter.put('/:id', async(request, response, next) => {
  const { author, title, url, likes } = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { author, title, url, likes }, { new:true, runValidators:true, context:'query' })
    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

// POST, create new blog to the list
blogsRouter.post('/', async(request, response, next) => {
  const blog = new Blog(request.body)

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  }
  else {
    try {
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
      console.log(savedBlog)
    } catch (exception) {
      next(exception)
    }
  }
})

// DELETE, delete blog by id
blogsRouter.delete('/:id', async(request, response, next) => {
  try {
    const blogToDelete = await Blog.findByIdAndRemove(request.params.id)
    console.log('deleted', blogToDelete)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter