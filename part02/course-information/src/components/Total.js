import React from 'react'


const Total = (props) => {
    return(
      <p>
        <b>Total of {props.total.reduce((partialSum, a) => partialSum + a.exercises, 0) } exercises</b>
      </p>
  
    )
  }
  export default Total