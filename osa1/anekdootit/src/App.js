import { useState } from 'react'


const Button = ({onClick, text}) => { 
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The function of good software is to make the complex appear to be simple.',
    'Good code is its own best documentation.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(9).fill(0)) // create a table with 9 elements filled with zeros

  const handleNextClick = () => {
    let random = Math.floor((Math.random() * 9))
    setSelected(random)
    console.log('selected', selected, anecdotes[selected])
  }

  const handleVoteClick = () => {
    const newVotes = [...votes] // create new votes table and copy original votes table there
    newVotes[selected] += 1 // add one point to selected anecdote
    setVotes(newVotes) // save new vote to original votes table
    console.log('votes', votes) // check everything is ok
  }

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      <Button onClick={handleNextClick} text="next anecdote"/>
      <Button onClick={handleVoteClick} text="vote" />
    </div>
  )
}

export default App