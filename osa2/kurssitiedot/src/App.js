

const Course = ({ course}) =>
<>
  <Header course={course.name} key={course.parts.id}/>
  <Content parts={course.parts} key={course.parts.id} />
  <Total parts={course.parts} key={course.parts.id} />
</>

const Header = ({ course }) => <h2>{course}</h2>

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
  return (
  <>
    {parts.map(partz => <Part key={partz.id} part={partz}/>)}
  </> // parts and partz are different!! parts is props and partz mapping values
  )
}


const App = () => {
  const courses = [
    {
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((coursez) => <Course course={coursez} key={coursez.id} />)}
    </div>
  )
}

export default App;