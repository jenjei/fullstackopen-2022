
const errorHandler = (error, request, response, next) => {
    console.error('middleware error', error)
  
    switch(error.message) {
        case 'Not found':
            return response.status(404).send({ message: 'Malformatted id, blog not found' })
        case 'Missing attributes':
            return response.status().send({ message: 'Missing url or title' })
    }
    
    next(error)
}

module.exports = {
    errorHandler
}