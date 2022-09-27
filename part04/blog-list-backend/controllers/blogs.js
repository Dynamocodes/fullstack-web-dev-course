const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
		const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
		response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  let postedBlog = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  postedBlog = {...postedBlog, user: user._id}
  const blog = new Blog(postedBlog)
  let returnedBlog = await blog.save()
  user.blogs = user.blogs.concat(returnedBlog._id)
  await user.save()
  response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToRemove = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if(!blogToRemove){
    response.status(400).json({ error: 'malformatted id' })
  }else if(decodedToken.id.toString() === blogToRemove.user.toString()){
    let user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.filter(id => id.toString() !== blogToRemove._id.toString())
    await user.save()
    await blogToRemove.remove()
    response.status(204).end()
  }else{    
    response.status(401).json({ error: "you can't delete blogs you don't own"})
  }
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