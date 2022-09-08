const Header = (props) => {
  return(
    <h1>
      {props.coursename};
    </h1>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>
      Number of exercises {props.total.reduce((partialSum, a) => partialSum + a.exercises, 0)}
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
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
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