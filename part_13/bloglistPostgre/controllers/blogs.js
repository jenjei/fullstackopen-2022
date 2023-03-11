// blog routes

const router = require('express').Router()
const { Blog } = require('../models/index')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

// GET all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

// GET one blog by id
router.get('/:id', blogFinder, async (req, res) => {
    if(req.blog) {
        res.json(req.blog)
    } else {
        throw Error('Not found')
    }
})

// POST/create new blog
router.post('/', async (req, res) => {
    console.log('creating blog', req)
    const blog = await Blog.create(req.body)
    if(blog) {
        res.json(blog)
    } else {
        throw Error('Missing attributes')
    }
})

// DELETE one blog by id
router.delete('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
      await req.blog.destroy()
      console.log(req.blog, 'deleted')
    } 
    else {
        throw Error('Not found')
    }
})

// UPDATE likes: increase
router.put('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
      console.log('updating likes', req.body.likes)
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog)
    }
    else {
        throw Error('Not found')
    }
})

module.exports = router