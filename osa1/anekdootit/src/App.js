import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    console.log('good click', good)
    setGood(good + 1)
    setAll(allClicks + 1)
  }
  const handleNeutralClick = () => {
    console.log('neutral click', neutral)
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }
  const handleBadClick = () => {
    console.log('bad click', bad)
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <h1>Give your feedback!</h1>
      <div>
        <button onClick={handleGoodClick}> good</button>
        <button onClick={handleNeutralClick}> neutral</button>
        <button onClick={handleBadClick}> bad</button>
      </div>
      <div>
        <h2>statistics</h2>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
      </div>
    </div>
  )
}

export default App