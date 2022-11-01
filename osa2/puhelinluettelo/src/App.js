import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import Person from './components/Person'
import personService from './services/person'
import { useState, useEffect } from 'react'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleAddClick = (event) => {
    event.preventDefault() // preventing the page to refresh, not always necessary but keep this in mind :)
    console.log('set new name')

    const found = persons.find(person => person.name === newName)
    if (found) {
      alert(
        `${newName} is already added to the phonebook.`
      )
      setNewName('')
      setNewNumber('')
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }
    personService
      .create(nameObject)
      .then(response => {
        console.log('post', response)
      })

    setPersons(persons.concat(nameObject))
    console.log('names: ', {persons})
    setNewName('') // clearing the input field
    setNewNumber('')
  }

  const deletePerson = (id) => {
    console.log('delete person')
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      personService
        .remove(personId)
      console.log(`${personName} successfully deleted`)
      setPersons(persons.filter(person => person.id !== personId))
    }
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  if (newFilter === '') {
    return (
      <div>
      <h2>Phonebook</h2>

      <PersonForm 
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newName={newName}
      newNumber={newNumber}
      handleAddClick={handleAddClick}
      />

      <h2>Numbers</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} placeholder={'search name'}></input>
      </div>
      <Contacts persons={persons} deletePerson={deletePerson} />
    </div>
    )
  } else {
    return (
      <div>
      <h2>Phonebook</h2>

      <PersonForm 
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newName={newName}
      newNumber={newNumber}
      handleAddClick={handleAddClick}
      />

      <h2>Numbers</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} placeholder={'search name'}></input>
      </div>
      <Contacts persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
    )
  }
}

export default App
