import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Message from './components/Message'
import axios from 'axios'

import './index.css'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [printName, searchName] = useState('')
  const [message, setMessage] = useState(null);


  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      axios.delete(`/api/persons/${id}`)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          alert('Failed to delete person')
        })
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (isNameInList) {
      const existingPerson = persons.find(p => p.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        axios.put(`/api/persons/${existingPerson.id}`, {
          name: newName,
          number: newNumber,
        })
        .then(response => {
          setPersons(prev => prev.map(p => p.id === existingPerson.id ? response.data : p))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${newName}`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          console.error('Error updating person:', error)
          setMessage(`Failed to update ${newName}`)
          setTimeout(() => setMessage(null), 5000)
        })
      }
      return
    }
    
    axios.post('/api/persons', {
      name: newName,
      number: newNumber,
    })
    .then(response => {
      setPersons(prev => [...prev, response.data])
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${newName}`)
      setTimeout(() => setMessage(null), 5000)
    })
    .catch(error => {
      console.error('Error adding person:', error)
      setMessage(`Failed to update ${error}`)
    })
  }


  useEffect(() => {
    axios.get('/api/persons')
      .then(response => {
        console.log('Fetched persons:', response.data)
        setPersons(response.data)
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
      })
  }, [])

  const isNameInList = Array.isArray(persons) && persons.some(person => person.name === newName)

  const personsToShow = printName === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(printName.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter printName={printName} searchName={searchName} />
     
      <h2>Add a new</h2>

      <Message message={message} />

      <PersonForm   
        addPerson={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        isNameInList={isNameInList}
      />

      <h2>Numbers</h2>
      

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App