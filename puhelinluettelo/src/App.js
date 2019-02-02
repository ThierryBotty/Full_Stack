import React, { useState } from 'react'

const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Persons = (props) => {
  persons = props.persons
  return(
    const rows = () => persons.map(person =>
      <Person
        key={person.name}
        person={person}
        number={person.number}
      />
    )
  )
}

const Filter = (props) => (
  <div>
    Rajaa: <input value={props.filter} onChange={props.updateFilter} />
  </div>
)

const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div> nimi: <input value={props.newName}
        onChange={props.handleNameChange} />
      </div>
      <div>numero: <input value={props.newNumber}
        onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    console.log('asdf')
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} on jo luettelossa!`)
      return
    }
    persons.push({name: newName, number: newNumber})
    setPersons(persons)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const updateFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter = {filter} updateFilter = {updateFilter}/>
      <h1> Lisää uusi </h1>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons persons = {persons}/>
    </div>
  )

}

export default App
