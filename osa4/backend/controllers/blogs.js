// all routes in this file!

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// GET one blog
blogsRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
})

// PUT, update likes
blogsRouter.put('/:id', (request, response, next) => {
  const { author, title, url, likes } = request.body

  Blog.findByIdAndUpdate(request.params.id, { author, title, url, likes }, { new:true, runValidators:true, context:'query' })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
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

module.exports = blogsRouter