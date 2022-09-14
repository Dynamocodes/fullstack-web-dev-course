import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import AddPerson from './components/AddPerson'
import contactServices from './services/contacts'
import _ from 'lodash'

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
  const removeHandler = (id) => {
    if(window.confirm(`remove ${persons.find(p => p.id === id).name}?`)){
      contactServices
        .remove(id)
        .then(returnedPerson =>{
          const personToRemove = persons.find(p => p.id === id)
          const personsCopy = [...persons]
          setPersons(personsCopy.filter(p => !_.isEqual(p, personToRemove)))
      })
    }
  }

  /* adding a new contact in the phonebook */
  const addEntry = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName, 
      number: newNumber, 
      id: Math.max(persons.map(person => person.id))+1}
    if(persons.filter(person => person.name === newName ).length === 0 ){
      contactServices.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }else{
      if(window.confirm(`${newName} is already added in phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(p => p.name === newName)
        const updatedPerson = {...personToUpdate, number: newNumber}
        const id = personToUpdate.id
        contactServices
        .update(id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        })
      }
      
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
      {personsToShow.map(person => 
        <Person  key={person.id} person={person} removeHandler={()=>removeHandler(person.id)}/>
      )}
    </div>
  )
}

export default App