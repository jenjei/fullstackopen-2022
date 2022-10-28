
import { useState } from 'react'

const Person = ({person}) => {
  return (
    <ul>{person.name} {person.number}</ul>
  )
}

const Contacts =({persons}) => {
  return (
    <div>
        {persons.map((persons, id) => 
          <Person key={id} person={persons} />
          )}
    </div>
  )
}

const PersonForm = ({handleAddClick, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={handleAddClick}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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
  )

}

export default App
