
const Person = ({person, deletePerson}) => {
  
    return (
      <ul>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></ul>
    )
  }

export default Person