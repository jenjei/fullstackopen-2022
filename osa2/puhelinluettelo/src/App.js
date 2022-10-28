import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
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
    setPersons(persons.concat(nameObject))
    console.log('names: ', {persons})
    setNewName('') // clearing the input field
    setNewNumber('')
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  
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
        filter shown with <input placeholder={'search name'}></input>
      </div>
      <Contacts persons={persons} />
    </div>
  ) // to do: filtering contacts!
}

export default App
