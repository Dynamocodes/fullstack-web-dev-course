import { useState } from 'react'

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
  const [newFilter, setNewFilter] = useState('')
  
  const personsToShow = newFilter === "" ? persons : persons.filter(
    person => person.name.toLowerCase().includes(newFilter.toLowerCase()) || person.number.toLowerCase().includes(newFilter)
  )

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const addEntry = (event) => {
    event.preventDefault()
    const personObject = {name : newName, number: newNumber}
    if(persons.filter(person => person.number === newNumber ).length === 0 ){
      setPersons(persons.concat(personObject))
    }else{
      alert(`${newNumber} is already used in the phonebook`)
    }
    
    setNewName("")
    setNewNumber("")
    setNewFilter("")
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
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
      {personsToShow.map(person => <Person key={person.numberÒ} person={person}/>)}
    </div>
  )
}

export default App