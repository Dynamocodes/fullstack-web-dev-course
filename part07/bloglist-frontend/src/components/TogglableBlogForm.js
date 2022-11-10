import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { useRef } from "react";``
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationTextReducer";
import { setNotificationType } from "../reducers/notificationTypeReducer"
import { createNewBlog } from "../reducers/blogReducer"

const TogglableBlogForm = () => {

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const handleCreate = async (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(setNotificationType("addNotification"))
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added!`, 5))
    dispatch(createNewBlog(blog))
  };

  return(
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm handleCreate={handleCreate}/>
    </Togglable>

  )
}

export default TogglableBlogForm