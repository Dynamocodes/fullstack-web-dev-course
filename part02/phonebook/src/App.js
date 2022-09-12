import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'

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

  const handleFilterChange = (event) => setNewFilter(event.target.value)
  

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

  const form = {
    onSubmit: addEntry,
    fields: [
      {
        label: 'name',
        initialValue: newName,
        handleChange: handleNameChange,
        id : 1 
      },
      {
        label: 'number',
        initialValue: newNumber,
        handleChange: handleNumberChange,
        id : 2
      }
    ]
  }
  
  return (

    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <AddPerson form={form}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App