import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeout = null
  
const notificationTextSlice = createSlice({
  name: 'notificationText',
  initialState,
  reducers: {
    showNotification(state, action){
      return action.payload
    },
    hideNotification(){
      return null
    }
  },
})

export const { showNotification, hideNotification } = notificationTextSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(showNotification(text))
    if(timeout){clearTimeout(timeout)}
    timeout = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationTextSlice.reducer