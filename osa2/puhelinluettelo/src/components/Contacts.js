import Person from './Person'

const Contacts =({persons}) => {
    return (
      <div>
          {persons.map((persons, id) => 
            <Person key={id} person={persons} />
            )}
      </div>
    )
}
export default Contacts