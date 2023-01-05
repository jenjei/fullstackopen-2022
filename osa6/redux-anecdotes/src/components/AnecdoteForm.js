import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { createAddNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async(event) => {
    event.preventDefault()
    console.log(event.target.anecdote.value) // form input is event.target.anecdote.value, uncontrolled component
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(createAddNotification(content))
  }

  return (
    <div> <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
    </div>
  )
}

export default NewAnecdote