import { createSlice } from '@reduxjs/toolkit'

const initialState = 'This is a notification'
  
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action){
      return state
    },
    changeNotificationText(state, action){
      return action.payload
    }
  },
})

export const {displayNotification, changeNotificationText} = notificationSlice.actions
export default notificationSlice.reducer