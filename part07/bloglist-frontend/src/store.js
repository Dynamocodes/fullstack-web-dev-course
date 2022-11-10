import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./reducers/blogReducer"
import notificationTextReducer from "./reducers/notificationTextReducer"
import notificationTypeReducer from "./reducers/notificationTypeReducer"
import passwordReducer from "./reducers/passwordReducer"
import usernameReducer from "./reducers/usernameReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notificationText: notificationTextReducer,
    notificationType: notificationTypeReducer,
    user: userReducer,
    password: passwordReducer,
    username: usernameReducer,
  }
})


export default store