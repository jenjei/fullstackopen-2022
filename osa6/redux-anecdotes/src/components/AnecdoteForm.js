import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { createAddNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log(event.target.anecdote.value) // form input is event.target.anecdote.value, uncontrolled component
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNewAnecdote(content))
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