import { useDispatch, useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { createVoteNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const notifications = useSelector(state => state.notification)
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    console.log('anecdotes', anecdotes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id, anecdote.content)
        console.log('notifications', notifications)
        dispatch(updateVotes(anecdote.id, anecdote.votes))
        // dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
        dispatch(createVoteNotification(anecdote.content))
        setTimeout(() => {
            dispatch(clearNotification(anecdote.content))
          }, 2000)
    }

    return (
        <div>
            {anecdotes
            .map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList