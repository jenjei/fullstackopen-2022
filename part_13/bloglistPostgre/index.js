require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}
    Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.TEXT
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
    })

Blog.sync() // if table doesnt exist, create one

// GET all blogs
app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

// GET one blog by id
app.get('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    
    if (blog) {
      console.log(blog.toJSON())
      res.json(blog)
    } else {
      res.status(404).end()
    }
})

// POST/create new blog
app.post('/api/blogs', async (req, res) => {
    try {
      console.log('creating blog', req)
      const blog = await Blog.create(req.body)
      res.json(blog)
    } catch(error) {
      return res.status(400).json({ error })
    }
})

// DELETE one blog by id
app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    
    if (blog) {
      blog.destroy()
      console.log(blog, 'deleted')
    } else {
      res.status(400).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})