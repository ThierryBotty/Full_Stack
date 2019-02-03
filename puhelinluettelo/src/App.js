import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Persons = ({ persons }) => {
  return(
    <>
      { persons.map(person =>
        <Person
          key={person.name}
          person={person}
          number={person.number}
        />)
      }
    </>
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
        onChange={props.updateName} />
      </div>
      <div>numero: <input value={props.newNumber}
        onChange={props.updateNumber}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} on jo luettelossa!`)
      return
    }
    persons.push({name: newName, number: newNumber})
    setPersons(persons)
  }

  const updateName = (event) => setNewName(event.target.value)
  const updateNumber = (event) => setNewNumber(event.target.value)
  const updateFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter = {filter} updateFilter = {updateFilter}/>
      <h1> Lisää uusi </h1>
      <Form
        addPerson={addPerson}
        newName={newName}
        updateName={updateName}
        newNumber={newNumber}
        updateNumber={updateNumber}
      />
      <h2>Numerot</h2>
      <Persons persons={persons.filter(x => x.name.toLowerCase().includes(filter))}/>
    </div>
  )
}

export default App
