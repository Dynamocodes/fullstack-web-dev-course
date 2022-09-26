const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	try {
		const blogs = await Blog.find({})
		response.json(blogs)
  } catch(error){
    next(error)
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  try {
    let returnedBlog = await blog.save()
    response.status(201).json(result)
  }catch(error){
    next(error)
  }
})
module.exports = blogsRouter