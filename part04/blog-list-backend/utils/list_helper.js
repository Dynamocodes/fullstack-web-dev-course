const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes}, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length !== 0 ? 
    blogs.reduce((top, b) => {return b.likes > top.likes ? b : top}, blogs[0]) : null
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}