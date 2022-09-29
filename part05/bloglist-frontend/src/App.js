import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const handleUsernameChange = (event) => { setUsername(event.target.value)}
  const handlePasswordChange = (event) => { setPassword(event.target.value)}
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const loginForm = {
    handleLogin: handleLogin,
    handleUsernameChange: handleUsernameChange,
    usernameValue: username,
    handlePasswordChange: handlePasswordChange,
    passwordValue: password
  }

  const notification = {
    type: "errorNotification",
    message: errorMessage
  }


  if (user === null) {
    return (
      <div>
        <Notification notification={notification}/>
        <LoginForm loginForm={loginForm}/>
      </div>
      
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
