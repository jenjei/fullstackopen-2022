import { useState } from 'react'

const Statistics = ({clicks}) => {
  const total = clicks.good + clicks.bad + clicks.neutral
  const average = (clicks.good*1 + clicks.bad*-1)/total 
  const positive = clicks.good/total*100

  console.log('clicks', total)

  if (total === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <p>good: {clicks.good}</p>
      <p>neutral: {clicks.neutral}</p>
      <p>bad: {clicks.bad}</p>
      <p>all feedbacks: {total}</p>
      <p>average: {average}</p>
      <p>positive feedback: {positive}%</p>
    </div>
  )
}


const App = () => {
  const [allClicks, setClicks] = useState ({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => {
    setClicks({...allClicks, good: allClicks.good + 1})
    console.log('good clicks', allClicks.good)
  }
  const handleNeutralClick = () => {
    setClicks({...allClicks, neutral: allClicks.neutral + 1})
    console.log('neutral clicks', allClicks.neutral)
  }
  const handleBadClick = () => {
    setClicks({...allClicks, bad: allClicks.bad + 1})
    console.log('bad clicks', allClicks.bad)
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
        <Statistics clicks={allClicks}/>
      </div>
    </div>
  )
}

export default App