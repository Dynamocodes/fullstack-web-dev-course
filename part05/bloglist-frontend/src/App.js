import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  //const removeNotification = "removeNotification"
  //const updateNotification = "updateNotification"
  const addNotification = "addNotification"
  const errorNotification = "errorNotification"

  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((b1, b2)=>{
        return b2.likes - b1.likes
      })
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleUsernameChange = (event) => { setUsername(event.target.value)}
  const handlePasswordChange = (event) => { setPassword(event.target.value)}
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationType(errorNotification)
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = async (blog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = 
      await 
        blogService
          .create(blog)
          .catch(err => {
            console.log(err)
          })
    setNotificationMessage(`a new blog ${returnedBlog.title} by ${blog.author} added!`)
    setNotificationType(addNotification)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    setBlogs(blogs.concat(returnedBlog))
  }

  const handleUpdate = async (id, blog) => {
    const updatedBlog = await blogService.update(id, blog)
    const indexToUpdate = blogs.map(b => b.id).indexOf(id)
    let blogsToUpdate = blogs.filter(b => b.id !== updatedBlog.id)
    blogsToUpdate.splice(indexToUpdate, 0, updatedBlog)
    blogsToUpdate.sort((b1, b2)=>{
      return b2.likes - b1.likes
    })
    setBlogs(blogsToUpdate)

  }

  const loginForm = {
    handleLogin: handleLogin,
    handleUsernameChange: handleUsernameChange,
    usernameValue: username,
    handlePasswordChange: handlePasswordChange,
    passwordValue: password
  }

  const notification = {
    type: notificationType,
    message: notificationMessage
  }

  const blogForm = {
    handleCreate: handleCreate,
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification}/>
        <div>
            <LoginForm loginForm={loginForm}/>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Notification notification={notification}/>
      <h2>blogs</h2>
      <div>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm blogForm={blogForm}/>
        </Togglable>
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} />
        )}
      </div>
    </div>
  )
}

export default App
