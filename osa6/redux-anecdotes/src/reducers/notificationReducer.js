import { createSlice } from '@reduxjs/toolkit'

const initialState = { notification: 'testing' }

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
      }
    },
  })
  
export const { createVoteNotification, createAddNotification } = notificationSlice.actions
export default notificationSlice.reducer