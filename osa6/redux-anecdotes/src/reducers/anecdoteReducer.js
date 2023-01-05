import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    sortAnecdotesAfterVote(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload

      state = state.map(anecdote =>
        anecdote.id !== id ? anecdote: changedAnecdote)
      return state.sort((b,a) => {
        return a.votes - b.votes
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      console.log('initialize payload', action.payload)
      return action.payload.sort((b, a) => {
        return a.votes - b.votes
      })
    }
  },
})

export const { sortAnecdotesAfterVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVotes = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(id)
    dispatch(sortAnecdotesAfterVote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer
