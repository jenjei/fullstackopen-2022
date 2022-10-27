
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleAddClick = (event) => {
    event.preventDefault() // preventing the page to refresh, not always necessary but keep this in mind :)
    console.log('set new name')

    const found = persons.find(person => person.name === newName)
    if (found) {
      alert(
        `${newName} is already added to the phonebook.`
      )
      setNewName('')
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(nameObject))
    console.log('names: ', {persons})
    setNewName('') // clearing the input field
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

      <form onSubmit={handleAddClick}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      {persons.map((person, id) => <p key={id}> {person.name} {person.number}</p>)}
    </div>
  )

}

export default App
