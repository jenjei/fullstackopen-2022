import { createSlice } from '@reduxjs/toolkit'

const initialState = { notification: undefined }

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      createVoteNotification(state, action) {
        const notification = action.payload
        console.log('payload:', notification)
        return(
            {
                notification: 'you voted "' + notification + '"',
            }
        )
      },
      createAddNotification(state, action) {
        const notification = action.payload
        return(
            {
                notification: 'You created anecdote: "' + notification + '"'       
            }
        )
      },
      clearNotification(state, action) {
        const nolla = undefined
        return (
          {
            notification: nolla,
          }
        )
      }
    },
  })
  
export const { createVoteNotification, createAddNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer