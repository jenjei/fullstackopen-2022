import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAddNotification, clearNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async(event) => {
    event.preventDefault()
    console.log(event.target.anecdote.value) // form input is event.target.anecdote.value, uncontrolled component
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    // dispatch(setNotification(`you added '${anecdote.content}'`, 10))
    dispatch(createAddNotification(content))
    setTimeout(() => {
      dispatch(clearNotification(content))
    }, 2000)
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