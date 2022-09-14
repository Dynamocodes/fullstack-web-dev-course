import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import contactServices from './services/contacts'

const App = () => {
  /* App states */
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  /* defining which individuals to show based on filter value */
  const personsToShow = newFilter === "" ? persons : persons.filter(
    person => person.name.toLowerCase().includes(newFilter.toLowerCase()) || person.number.toLowerCase().includes(newFilter)
  )

  /* onChange handlers for the fields of the form and the filter */
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  /* adding a new contact in the phonebook */
  const addEntry = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName, 
      number: newNumber, 
      id: persons.length+1}
    if(persons.filter(person => person.name === newName ).length === 0 ){
      contactServices.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setPersons(persons.concat(personObject))
    }else{
      alert(`${newName} is already in phonebook`)
    }
    setNewName("")
    setNewNumber("")
    setNewFilter("")
  }

  /* getting existing entries of the phonebook from the server */
  useEffect(() => {
    contactServices.getAll().then(allPersons => setPersons(allPersons))}, [])

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