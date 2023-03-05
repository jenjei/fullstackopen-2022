import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`http://localhost:3001/anecdotes/${id}`)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0, id: getId() }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id) => {
    const anecdotes = await getAll()
    const anecdoteToChange = anecdotes.find(n => n.id === id)
    const newVotes = anecdoteToChange.votes + 1
    const changedAnecdote = { 
        ...anecdoteToChange,
        votes: newVotes
    }
    console.log('changed anecdote', changedAnecdote)
    const response = await axios.put(`http://localhost:3001/anecdotes/${id}`, changedAnecdote)
    return response.data
}

const exportedObject = {
    getAll,
    getOne,
    createNew,
    update
}

export default exportedObject