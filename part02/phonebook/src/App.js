import { useState } from 'react'
import _ from "lodash"

const Person = (props) => {
  return(
    <p>{props.name}</p>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const addName = (event) => {
    event.preventDefault()
    const personObject = {name : newName}
    if(persons.filter(person => _.isEqual(personObject, person)).length === 0 ){
      setPersons(persons.concat(personObject))
    }else{
      alert(`${newName} is already added to phonebook`)
    }
    
    setNewName("")
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name}/>)}
    </div>
  )
}

export default App