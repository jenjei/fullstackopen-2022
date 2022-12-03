require('dotenv').config()
const Blog = require('./models/blog')

const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('<h1>Welcome to BlogList backend!</h1>')
})
  
app.get('/api/blogs', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
      })
})

app.get('/api/blogs/:id', (request, response) => {
  Blog.findById(request.params.id)
  .then(blog => {
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })
})

app.put('/api/blogs/:id', (request, response, next) => {
  const { author, title, url, likes } = request.body

  Blog.findByIdAndUpdate(request.params.id, { author, title, url, likes }, { new:true, runValidators:true, context:'query' })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

app.post('/api/blogs', (request, response) => {

    const blog = new Blog(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
        console.log(result)
      })
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})