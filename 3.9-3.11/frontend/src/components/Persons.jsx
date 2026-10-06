import '../index.css'
const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <ul>
      {personsToShow.map(person => (
        <li className="person" key={person.id}>
          {person.name} {person.number} <button type="submit" onClick={() => deletePerson(person.id)}>delete</button>
          
        </li>
      ))}
    </ul>
  )
}

export default Persons