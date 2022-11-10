import { connect } from "react-redux"
import loginService from "../services/login";
import blogService from "../services/blogs"
import { setUserValue } from "../reducers/userReducer";
import { usernameChangeHandler, resetUsername } from "../reducers/usernameReducer"
import { passwordChangeHandler, resetPassword } from "../reducers/passwordReducer"
import { setNotification } from "../reducers/notificationTextReducer";
import { setNotificationType } from "../reducers/notificationTypeReducer"

const LoginForm = (props) => {


  const handleUsernameChange = (event) => {
    props.usernameChangeHandler(event.target.value);
  };

  const handlePasswordChange = (event) => {
    props.passwordChangeHandler(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const username = props.username
      const password = props.password
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      props.setUserValue(user);
      props.resetUsername()
      props.resetPassword()
    } catch (exception) {
      props.setNotificationType("errorNotification")
      props.setNotification("wrong credentials", 5)
    }
  };

  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            onChange={handleUsernameChange}
            value={props.username}
            name="Username"
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            onChange={handlePasswordChange}
            value={props.password}
            name="Password"
          />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password : state.password,
    user: state.user,
    notificationText: state.notificationText
  }
}

const mapDispatchToProps = {
  resetPassword,
  resetUsername,
  usernameChangeHandler,
  passwordChangeHandler,
  setUserValue,
  setNotificationType,
  setNotification,

}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default connectedLoginForm;
