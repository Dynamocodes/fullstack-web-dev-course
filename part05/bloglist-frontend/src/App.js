import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
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
    setTitle('')
    setAuthor('')
    setUrl('')

  }
  const handleTitleChange = (event) => { setTitle(event.target.value)}
  const handleAuthorChange = (event) => { setAuthor(event.target.value)}
  const handleUrlChange = (event) => { setUrl(event.target.value)}

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
    titleValue: title,
    handleTitleChange: handleTitleChange,
    authorValue: author,
    handleAuthorChange: handleAuthorChange,
    urlValue: url,
    handleUrlChange: handleUrlChange
  }

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

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
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm blogForm={blogForm}/>
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
