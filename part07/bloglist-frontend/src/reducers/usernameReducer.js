import { createSlice } from '@reduxjs/toolkit'

const initialState = ""
  
const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    handleUsernameChange(state, action){
      return action.payload
    },
    setUsername(state, action){
      return action.payload
    }
  }
})

export const { handleUsernameChange, setUsername } = usernameSlice.actions

export const usernameChangeHandler = (username) => {
  return dispatch => {
    dispatch(handleUsernameChange(username))
  }
}

export const resetUsername = () => {
  return dispatch => {
    dispatch(setUsername(""))
  }
}

export default usernameSlice.reducer