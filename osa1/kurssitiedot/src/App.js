// imports...


// components
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}
const Part = (props) => {
  console.log('part')
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}
const Content = (props) => {
  console.log('content')
  return (
    <div>
      <Part part={props.part_one} exercise={props.exercise_one}/>
      <Part part={props.part_two} exercise={props.exercise_two}/>
      <Part part={props.part_three} exercise={props.exercise_three}/>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises}</p>
    </div>
  )
}

// main component
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14


  return (
    <div>
      <Header title={course}/>
      <Content 
      part_one={part1} exercise_one={exercise1}
      part_two={part2} exercise_two={exercise2}
      part_three={part3} exercise_three={exercise3}
      />
      <Total exercises={exercise1+exercise2+exercise3}/>
    </div>
  )
}

export default App;