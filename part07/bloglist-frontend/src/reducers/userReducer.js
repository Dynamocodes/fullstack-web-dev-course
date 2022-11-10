import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = null
  
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser(state, action){
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }
}

export const disconnectUser = () => {
  return dispatch => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null))
  }
}

export const setUserValue = (user) => {
  return dispatch => {
    dispatch(setUser(user))
  }
}
export default userSlice.reducer