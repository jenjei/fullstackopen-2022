import './components.css'

const PersonForm = ({handleAddClick, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
      <form onSubmit={handleAddClick}>
          <div>
            <p>name: <input value={newName} onChange={handleNameChange} /></p>
          </div>
          <div>
            <p>number: <input value={newNumber} onChange={handleNumberChange}/></p></div>
          <div>
            <button className='add' type="submit">add</button>
          </div>
        </form>
    )
  }

  export default PersonForm