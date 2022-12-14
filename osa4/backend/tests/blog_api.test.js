const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

// testing get route
describe('testing get blogs route', () => {
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
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  // testing specific blog title
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'maailman parhaat pannarit'
    )
  })
})
// testing id
test('identifier is id not _id', async() => {
  /*const doc = await Blog.findOne({})
  let mykeys = Object.keys(doc.toObject())
  console.log('keys', mykeys) // keys [ '_id', 'title', 'author', 'url', 'likes', '__v' ]

  const dok = await Blog.updateMany( {}, { $rename: { '_id': 'id' } } ) // comes with following error: MongoServerError: Performing an update on the path '_id' would modify the immutable field '_id'

  let myNewKeys = Object.keys(dok.toObject())
  console.log('new keys', myNewKeys) */

  const response = await api.get('/api/blogs')
  console.log('response',response.body) // these id:s are in format of 'id'
  const identifiers = response.body.map(id => id.id)
  console.log('identifiers', identifiers)
  expect(identifiers).toBeDefined()
  expect('id' in identifiers)
})

// testing post route
describe('testing put blog route', () => {
  // testing that post can be done
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'squarepants',
      author: 'spongebob',
      url: 'google.com',
      likes: 0,
      id: '6396d7b454b16ac32bfd97c7'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('squarepants')
  })
  // testing that likes are zero
  test('if the new blog has not any likes, likes are zero', async () => {
    const newBlog = {
      title: 'asdf',
      author: 'asdf',
      url: 'asdf'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await helper.blogsInDb()
    const likes = response.map(r => r.likes)
    expect(likes[likes.length - 1]).toEqual(0)
  })
  // testing that new blog has title and url
  test('if the new blog hasnt title and/or url, response is bad request 400', async() => {
    const newBlog = {
      title: 'must have title',
      author: 'must have author', // url is missing here!
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400) // expect bad request

    const response = await helper.blogsInDb()
    expect(response.length).toEqual(helper.initialBlogs.length) // and check that new blog is not saved to db
  })
})

// testing delete route
describe('testing delete route', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('testing get one blog by id route', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
})

describe('testing put route', () => {
  test('a specific blog can be liked', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToLike = blogsAtStart[0]

    const likedBlog = {
      title: blogToLike.title,
      author: blogToLike.author,
      url: blogToLike.url,
      likes: blogToLike.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToLike.id}`)
      .send(likedBlog)

    expect(likedBlog.likes).toEqual(blogsAtStart[0].likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
