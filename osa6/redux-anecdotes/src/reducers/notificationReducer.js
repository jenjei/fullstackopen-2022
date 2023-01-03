import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
      notification: 'testing',
    },
]

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      createNotification(state, action) {
        const content = action.payload
        state.push({
          content,
        })
      },
    },
  })
  
export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer