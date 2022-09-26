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

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return null
  }else{
    const authors = [...new Set(blogs.map(b => b.author))]
    const blogsPerAuthor = {}
    authors.forEach(a => {
      blogsPerAuthor[a] = blogs.reduce((amount, blog) => { 
        return a === blog.author 
          ? amount + 1 
          : amount
      }, 0)
    })
    const maxKey = Object.keys(blogsPerAuthor).reduce(function(a, b){ return blogsPerAuthor[a] > blogsPerAuthor[b] ? a : b });
    return {author: maxKey, blogs: blogsPerAuthor[maxKey]}
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return null
  }else{
    const authors = [...new Set(blogs.map(b => b.author))]
    const likesPerAuthor = {}
    authors.forEach(a => {
      likesPerAuthor[a] = blogs.reduce((amount, blog) => { 
        return a === blog.author 
          ? amount + blog.likes 
          : amount
      }, 0 )
    })
    const maxKey = Object.keys(likesPerAuthor).reduce(function(a, b){ return likesPerAuthor[a] > likesPerAuthor[b] ? a : b });
    return {author: maxKey, likes: likesPerAuthor[maxKey]}
  }
}

  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}