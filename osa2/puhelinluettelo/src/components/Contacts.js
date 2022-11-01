import Person from './Person'

const Contacts =({persons, deletePerson}) => {
    return (
      <div>
          {persons.map((persons, id) => 
            <Person key={id} person={persons} deletePerson={deletePerson}/>
            )}
      </div>
    )
}
export default Contacts