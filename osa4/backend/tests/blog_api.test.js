const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        author: "Nalle Puh",
        title: "Tarinoita Puolenhehtaarin metsästä",
        url: "www.google.com",
        likes: 8,
        id: 1
      },
      {
        author: "Peter Pan",
        title: "Mikä on Mikä-mikä-maa",
        url: "www.google.com",
        likes: 4,
        id: 2
      },
      {
        author: "muumimamma",
        title: "maailman parhaat pannarit",
        url: "google.com",
        likes: 5,
        id: 3
      },
      {
        author: "teletappi",
        title: "missä on nuunuu",
        url: "google.com",
        likes: 0,
        id: 4
      }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()
})

// testing that blogs are returned as json
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// testing that there is right amount of blog objects
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'maailman parhaat pannarit'
  )
})

afterAll(() => {
  mongoose.connection.close()
})
