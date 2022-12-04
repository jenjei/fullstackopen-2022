// all routes in this file!

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
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
blogsRouter.post('/', (request, response) => {

  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
      console.log(result)
    })
})

module.exports = blogsRouter