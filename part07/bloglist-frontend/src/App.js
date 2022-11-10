import { useEffect } from "react";
import { connect } from "react-redux";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";
import { initializeBlogs}  from "./reducers/blogReducer";
import { initializeUser, disconnectUser } from "./reducers/userReducer";
import TogglableBlogForm from "./components/TogglableBlogForm";

const App = (props) => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  useEffect(() => {
    dispatch(initializeUser())
  }, []);

  const handleLogout = () => {
    dispatch(disconnectUser())
  };

  if (props.user === null) {
    return (
      <div>
        <Notification />
        <div>
          <LoginForm/>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      <div>
        {props.user.name} logged in
        <button id="logoutButton" onClick={handleLogout}>
          logout
        </button>
      </div>
      <div>
        <TogglableBlogForm/>
      </div>
      <div>
          <BlogList/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const connectedApp = connect(mapStateToProps)(App)
export default connectedApp;
