import { createSlice } from '@reduxjs/toolkit'

const initialState = null
  
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showVoteNotification(state, action){
      return `You voted ${action.payload} !`
    },
    hideNotification(state, action){
      return null
    }
  },
})

export const {showVoteNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer