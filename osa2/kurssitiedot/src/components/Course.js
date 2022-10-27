const Course = ({ course}) =>
<>
  <Header course={course.name} key={course.parts.id}/>
  <Content parts={course.parts} key={course.parts.id} />
  <Total parts={course.parts} key={course.parts.id} />
</>

const Header = ({ course }) => <h2>{course}</h2>


const Content = ({ parts }) => {
  console.log('content', parts)
  // mapping props so that no matter how many parts added/deleted in App component, parts will render correctly on screen
  return (
  <>
    {parts.map(partz => <Part key={partz.id} part={partz}/>)}
  </> // parts and partz are different!! parts is props and partz mapping values
  )
}


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


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
  
export default Course