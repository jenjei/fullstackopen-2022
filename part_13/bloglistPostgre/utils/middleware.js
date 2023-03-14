const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const errorHandler = (error, request, response, next) => {
    console.error('middleware error', error)
  
    switch(error.message) {
        case 'Blog not found':
            return response.status(404).send({ message: 'Malformatted id, blog not found' })
        case 'Blog missing attributes':
            return response.status().send({ message: 'Missing url or title' })
        case 'User not found':
          return response.status(404).send({ message: 'Malformatted id, user not found' })
        case 'User missing attributes':
          return response.status().send({ message: 'Missing name or username' })
    }
    
    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7))
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch (error){
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    } else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
  }

module.exports = {
    errorHandler,
    tokenExtractor
}