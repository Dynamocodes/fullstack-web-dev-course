import { useState } from 'react'
import _ from "lodash"

const Person = (props) => {
  return(
    <p>{props.person.name} {props.person.number}</p>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const addEntry = (event) => {
    event.preventDefault()
    const personObject = {name : newName, number: newNumber}
    if(persons.filter(person => _.isEqual(personObject, person)).length === 0 ){
      setPersons(persons.concat(personObject))
    }else{
      alert(`${newName} is already added to phonebook`)
    }
    
    setNewName("")
    setNewNumber("")
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}

export default App