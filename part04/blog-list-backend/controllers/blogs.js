const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
		const blogs = await Blog.find({})
		response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const postedBlog = request.body
  const user = await User.findById(body.userId)
  postedBlog.user = user._id
  const blog = new Blog(postedBlog)
  let returnedBlog = await blog.save()
  user.blogs = user.blogs.concat(returnedBlog._id)
  response.status(201).json(returnedBlog)
 
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.status(200).json(blog)
  }else{
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {...request.body}
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  if(updatedBlog){
    response.json(updatedBlog)
  }else{
    response.status(400).end()
  }
})

module.exports = blogsRouter