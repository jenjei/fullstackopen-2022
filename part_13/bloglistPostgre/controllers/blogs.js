// blog routes

const router = require('express').Router()
const { Blog, User } = require('../models/index')
const { tokenExtractor } = require('../utils/middleware')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

// GET all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

// GET one blog by id
router.get('/:id', blogFinder, async (req, res) => {
    if(req.blog) {
        res.json(req.blog)
    } else {
        throw Error('Blog not found')
    }
})

// POST/create new blog
router.post('/', tokenExtractor, async (req, res) => {
    console.log('creating blog', req)
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    if(blog) {
        res.json(blog)
    } else {
        throw Error('Blog missing attributes')
    }
})

// DELETE one blog by id
router.delete('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
      await req.blog.destroy()
      console.log(req.blog, 'deleted')
    } 
    else {
        throw Error('Blog not found')
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
        throw Error('Blog not found')
    }
})

module.exports = router