const router = require('express').Router()

const { User, Blog } = require('../models/index')

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  next()
}

// GET all users
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog,
        attributes: { exclude: ['userId'] }
    }
  })
  if(users) {
    res.json(users)
  } else {
    throw Error('User not found')
  }
})

// POST/create new user
router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    if (user) {
        res.json(user)
    } else {
        throw Error('User missing attributes')
    }
    
})

// GET one user by id
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    throw Error('User not found')
  }
})

// PUT/update username
router.put('/:id', userFinder, async (req, res) => {
  if (req.user) {
    console.log('updating username', req.body.username)
    req.user.username = req.body.username
    await req.user.save()
    res.json(req.user)
  }
  else {
      throw Error('User not found')
  }
})

module.exports = router