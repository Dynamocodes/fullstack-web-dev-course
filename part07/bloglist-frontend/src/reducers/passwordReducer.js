import { createSlice } from '@reduxjs/toolkit'

const initialState = ""
  
const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    handlePasswordChange(state, action){
      return action.payload
    },
    setPassword(state, action){
      return action.payload
    }
  }
})

export const { handlePasswordChange, setPassword } = passwordSlice.actions

export const passwordChangeHandler = (password) => {
  return dispatch => {
    dispatch(handlePasswordChange(password))
  }
}

export const resetPassword = () => {
  return dispatch => {
    dispatch(setPassword(""))
  }
}

export default passwordSlice.reducer