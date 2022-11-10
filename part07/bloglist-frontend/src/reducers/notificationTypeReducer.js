import { createSlice } from '@reduxjs/toolkit'

const initialState = "notification"
  
const notificationTypeSlice = createSlice({
  name: 'notificationType',
  initialState,
  reducers: {
    setType(state, action){
      return action.payload
    },
  },
})

export const { setType } = notificationTypeSlice.actions

export const setNotificationType = (type) => {
  return dispatch => {
    dispatch(setType(type))
   
  }
}

export default notificationTypeSlice.reducer