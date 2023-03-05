const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: 'Nalle Puh',
    title: 'Tarinoita Puolenhehtaarin metsästä',
    url: 'www.google.com',
    likes: 8,
    id: 1
  },
  {
    author: 'Peter Pan',
    title: 'Mikä on Mikä-mikä-maa',
    url: 'www.google.com',
    likes: 4,
    id: 2
  },
  {
    author: 'muumimamma',
    title: 'maailman parhaat pannarit',
    url: 'google.com',
    likes: 5,
    id: 3
  },
  {
    author: 'teletappi',
    title: 'missä on nuunuu',
    url: 'google.com',
    likes: 0,
    id: 4
  }
]

const initialUsers = [
  {
    username: 'meh',
    name: 'Maija',
    password: 'asdf1234'
  },
  {
    username: 'jenniaylis',
    name: 'Jenni',
    password: 'asdf1234'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'gonna be removed', author: 'somebody', url: 'google.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, initialUsers, logIn
}