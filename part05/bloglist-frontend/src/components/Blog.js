import { useState} from 'react'

const Blog = ({blog, handleUpdate}) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailedView, setDetailedView] = useState(false)

  const buttonLabel = detailedView ? "hide" : "view"

  const toggleDetailedView = () => {
    setDetailedView(!detailedView)
  }

  const likeBlog = async () => {
    let blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    handleUpdate(blog.id, blogToUpdate)
  }

  if(detailedView) {
    return(
      <div style={blogStyle}>
        <div>{blog.title} {blog.author}<button onClick={toggleDetailedView}>{buttonLabel}</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={likeBlog}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    )
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetailedView}>view</button>
    </div>
  )  
}

export default Blog