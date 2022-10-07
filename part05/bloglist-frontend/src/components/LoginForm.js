import PropTypes from 'prop-types'

const LoginForm = (
  {
    handleLogin,
    handleUsernameChange,
    usernameValue,
    handlePasswordChange,
    passwordValue
  }) => {
  return(
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            onChange={handleUsernameChange}
            value={usernameValue}
            name='Username'/>
        </div>
        <div>
          password
          <input
            type='password'
            onChange={handlePasswordChange}
            value={passwordValue}
            name='Password'/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  usernameValue: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  passwordValue: PropTypes.string.isRequired
}

export default LoginForm