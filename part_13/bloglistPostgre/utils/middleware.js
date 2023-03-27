const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const errorHandler = (error, request, response, next) => {
    console.error('middleware error', error)
  
    switch(error.message) {
        case 'Blog not found':
            return response.status(404).send({ message: 'Malformatted id, blog not found' })
        case 'Blog missing attributes':
            return response.status(400).send({ message: 'Missing url or title' })
        case 'User not found':
          return response.status(404).send({ message: 'Malformatted id, user not found' })
        case 'User missing attributes':
          return response.status(400).send({ message: 'Missing name or username' })
        case 'Validation error: Validation isEmail on username failed':
          return response.status(400).send({ message: 'Malformatted username, must be in email format: foo@bar.com' })
        case 'Delete authorization error':
          return response.status(403).send({ message: 'User cannot delete blogs added by other user' })
        case 'Validation error: Validation max on year failed':
          return response.status(400).send({ message: 'Max year is current year. Cannot insert higher values.' })
        case 'Validation error: Validation min on year failed':
          return response.status(400).send({ message: 'Min year is 1991. Cannot insert lower values.' })
        case 'Readinglist not found':
          return response.status(404).send({ message: 'Malformatted id, readinglist not found' })
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