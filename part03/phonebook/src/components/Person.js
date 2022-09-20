const Person = (props) => {
    return(
      <div>
        {props.person.name} {props.person.number}
        <button onClick={props.removeHandler}>remove</button>
      </div>
    )
}

export default Person
