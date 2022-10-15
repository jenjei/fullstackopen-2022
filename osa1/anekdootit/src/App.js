import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({clicks}) => {
  const total = clicks.good + clicks.bad + clicks.neutral
  const average = (clicks.good*1 + clicks.bad*-1)/total 
  const positive = clicks.good/total*100 + "%"

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
      <StatisticLine text="good" value ={clicks.good} />
      <StatisticLine text="neutral" value ={clicks.neutral} />
      <StatisticLine text="bad" value ={clicks.bad} />
      <StatisticLine text="all feedbacks" value ={total} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive} />
    </div>
  )
}

const Button = ({onClick, text}) => { 
  return (
    <button onClick={onClick}>
      {text}
    </button>
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
        <Button onClick={handleGoodClick} text='good :)'/>
        <Button onClick={handleNeutralClick} text='neutral :|'/>
        <Button onClick={handleBadClick} text='bad :('/>
      </div>
      <div>
        <Statistics clicks={allClicks}/>
      </div>
    </div>
  )
}

export default App