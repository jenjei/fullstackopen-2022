

const Course = ({ course }) =>
<>
<Header course={course.name} />
<Content parts={course.parts} />
<Total parts={course.parts}/>
</>

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  // reduce function counts the sum of array values conveniently
  const sum = parts.reduce((previous, current) => console.log(previous, current) || (previous = previous + current.exercises), 0)
  console.log('total sum', sum)

  return (
    <b>
      Number of exercises {sum}
    </b>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  console.log('content', parts)
  // mapping props so that no matter how many parts added/deleted in App component, parts will render correctly on screen
  return(
  <>
    {parts.map(partz => <Part key={partz.id} part={partz}/>)}
  </> // parts and partz are different!! parts is props and partz mapping values
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux of a component',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;