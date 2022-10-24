import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeout = null
  
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showVoteNotification(state, action){
      return action.payload
    },
    hideNotification(state, action){
      return null
    }
  },
})

export const { showVoteNotification, hideNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(showVoteNotification(text))
    if(timeout){clearTimeout(timeout)}
    timeout = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer