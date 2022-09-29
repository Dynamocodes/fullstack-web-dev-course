const LoginForm = (props) => {
  return(
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={props.loginForm.handleLogin}>
        <div>
          username
          <input 
            type='text' 
            onChange={props.loginForm.handleUsernameChange} 
            value={props.loginForm.usernameValue}
            name='Username'/>
        </div>
        <div>
          password
          <input 
            type='password' 
            onChange={props.loginForm.handlePasswordChange} 
            value={props.loginForm.passwordValue}
            name='Password'/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm