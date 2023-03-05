import Person from './Person'
import './components.css'

const Contacts =({persons, deletePerson}) => {
    return (
      <div>
          {persons?.map((persons, id) => 
            <Person key={id} person={persons} deletePerson={deletePerson}/>
            )}
      </div>
    )
}
export default Contacts