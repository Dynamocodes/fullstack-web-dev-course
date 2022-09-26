const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({})
		response.json(blogs)
  } catch(error){
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  let postedBlog = request.body
  const blog = new Blog({
    title: postedBlog.title,
    author: postedBlog.author,
    url: postedBlog.url,
    likes: postedBlog.likes
  })
  try {
    let returnedBlog = await blog.save()
    response.status(201).json(returnedBlog)
  }catch(error){
    next(error)
  }
})
module.exports = blogsRouter