import Person from './Person'

const Persons = (props) => {
    return(
        <div>
            {props.persons.map(person => <Person key={person.number} person={person}/>)}
        </div>
    )
}

export default Persons