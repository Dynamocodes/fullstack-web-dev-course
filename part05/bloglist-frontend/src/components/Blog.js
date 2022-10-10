import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ key, blog, handleUpdate, handleDelete, isUserOwner }) => {

  const detailedBlog = 'detailedBlog'
  const shortenedBlog = 'shortenedBlog'

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailedView, setDetailedView] = useState(false)

  const buttonLabel = detailedView ? 'hide' : 'view'

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

  const deleteBlog = () => {
    handleDelete(blog.id)
  }

  const deleteButton =
    isUserOwner(blog.user.username)
      ? <button className='removeButton' onClick={deleteBlog}>remove</button>
      : null

  if(detailedView) {
    return(
      <div id={key} className={detailedBlog} style={blogStyle}>
        <div>{blog.title} {blog.author}<button className='view' onClick={toggleDetailedView}>{buttonLabel}</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button className='like' onClick={likeBlog}>like</button></div>
        <div>{blog.user.name}</div>
        <div>{deleteButton}</div>
      </div>
    )
  }
  return(
    <div id={key} className={shortenedBlog} style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetailedView}>{buttonLabel}</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isUserOwner: PropTypes.func.isRequired,
}
Blog.displayName = 'Blog'

export default Blog