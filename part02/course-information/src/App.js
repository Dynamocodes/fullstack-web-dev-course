const Header = (props) => {
  return(
    <h2>
      {props.coursename}
    </h2>
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
      <h1>Web development curiculum</h1>
      {courses.map(course => <Course key={course.id} course={course}/>)}
      
    </div>
  )
}

export default App