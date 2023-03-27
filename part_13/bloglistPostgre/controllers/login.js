const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const User = require('../models/user')
const { Session } = require('../models/index')
const { tokenExtractor } = require('../utils/middleware')

// POST, user log in
router.post('/login', async (request, response) => {

  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({
    userId: user.id,
    token: token
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

// DELETE, user log out
router.delete('/logout', tokenExtractor, async(req, res) => {
  const session = await Session.findOne({ where: { userId: req.decodedToken.id }})
  console.log('TOKEN ID',req.decodedToken.id)

  if (session) {
    console.log('LOGGED OUT', session)
    await session.destroy()
    console.log('LOGGED OUT CONFIRMED', session)
    res.status(200).json({message: 'Logged out successfully'})
  } else {
    throw Error('Session not found')
  }
})

module.exports = router