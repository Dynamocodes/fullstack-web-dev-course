import { connect } from 'react-redux'
import Blog from './Blog'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationTextReducer'
import { setNotificationType } from '../reducers/notificationTypeReducer'

const BlogList = (props) => {

  const unorderedBlogs = [...props.blogs]
  const orderedBlogs = unorderedBlogs.sort((a,b)=>{
    return b.likes - a.likes
  })

  const handleUpdate = (id, blog) => {
    props.updateBlog(id, blog)
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this blog?")) {
      const toDelete = props.blogs.filter(b => b.id === id)[0]
      const blogTitle = toDelete.title
      const blogAuthor = toDelete.author
      props.removeBlog(id)
      props.setNotificationType("removeNotification")
      props.setNotification(`a blog ${blogTitle} by ${blogAuthor} removed!`, 5)
    };
  }

  const isUserOwner = (username) => {
    return username === props.user.username;
  };
  return(
    <div>
    { orderedBlogs.map( (blog) => 
      <Blog
      key={blog.id}
      blog={blog}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      isUserOwner={isUserOwner}
      />
    )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notificationText: state.notificationText,
    notificationType: state.notificationType,
    user: state.user
  }
}

const mapDispatchToProps = {
  removeBlog,
  updateBlog,
  setNotificationType,
  setNotification,
}

const connectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default connectedBlogList