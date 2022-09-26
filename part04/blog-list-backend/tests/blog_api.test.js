const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
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
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[5])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test(`there are ${initialBlogs.length} blogs`, async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map((b) => b.title)
  expect(titles).toContain('React patterns')
})

test('the field id is defined in all of the blogs', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach(b => expect(b.id).toBeDefined())
})

test('a new blog is added to the database after a valid post request', async () => {
  let blog = {
    title: 'my cool title',
    author: 'Elias Hietanen',
    url: 'www.mycoolblogsit.com/lkjsdflk/',
    likes: 4
  }
  await api.post('/api/blogs').send(blog).expect(201)
  const getResponse = await api.get('/api/blogs')
  titles = getResponse.body.map(b => b.title)
  
  expect(titles).toContain(blog.title)
  expect(getResponse.body.length).toBe(initialBlogs.length + 1)
})

test('likes are initilized to 0 if no value is given', async () => {
  let blog = {
    title: 'my other cool title',
    author: 'Elien Hietanas',
    url: 'www.mycoolblogsit.com/lkjsdflk/',
  }
  let postedBlog = await api.post('/api/blogs').send(blog).expect(201)
  let response = await api.get('/api/blogs')
  console.log(postedBlog)
  expect(postedBlog.body.likes).toBe(0)
})
afterAll(() => {
  mongoose.connection.close()
})