const Header = (props) => {
  return(
    <h1>
      {props.coursename}
    </h1>
  )
}

const Content = (props) => {
  return(
    <div>
      {props.parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Total = (props) => {
  return(
    <p>
      <b>Total of {props.total.reduce((partialSum, a) => partialSum + a.exercises, 0) } exercises</b>
    </p>

  )
}

const Part = (props) => {
  return(
    <p>
      {props.part.name} {props.part.exercises}
    </p>

  )
}

const Course = (props) => {
  return(
    <div>
      <Header coursename={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total total={props.course.parts}/>
    </div>

  )

}

const App = () => {


  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }


  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App