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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header title={course}/>
      <Content 
      part_one={part1.name} exercise_one={part1.exercises}
      part_two={part2.name} exercise_two={part2.exercises}
      part_three={part3.name} exercise_three={part2.exercises}
      />
      <Total exercises={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

export default App;