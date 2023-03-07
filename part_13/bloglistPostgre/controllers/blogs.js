// blog routes

const router = require('express').Router()

const { Blog } = require('../models/index')

// GET all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

// GET one blog by id
router.get('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    
    if (blog) {
      console.log(blog.toJSON())
      res.json(blog)
    } else {
      res.status(404).end()
    }
})

// POST/create new blog
router.post('/', async (req, res) => {
    try {
      console.log('creating blog', req)
      const blog = await Blog.create(req.body)
      res.json(blog)
    } catch(error) {
      return res.status(400).json({ error })
    }
})

// DELETE one blog by id
router.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    
    if (blog) {
      blog.destroy()
      console.log(blog, 'deleted')
    } else {
      res.status(400).end()
    }
})

// UPDATE likes: increase
router.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        console.log('updating likes', req.body.likes)
      blog.likes = req.body.likes
      await blog.save()
      res.json(blog)
    } else {
      res.status(404).end()
    }
})

module.exports = router