import './App.css'
import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, remove }) => (
  <li>
  {person.name} {person.number}
  <button onClick={remove}>poista</button>
  </li>
)

const Persons = ({ persons, remove }) => {
  return(
    <>
      { persons.map(person =>
        <Person
          key={person.name}
          person={person}
          number={person.number}
          remove={() => remove(person)}
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

const Notification = ({message}) => {
  let className = "notification"
  if (message === null) return null
  if (message.error === true) className = "error"
  return (<div className = {className}> {message.message}</div>)
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
      personService.getAll().then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const old = persons.find(person => person.name === newName)
    if (old) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService
        .update({name: old.name, number: newNumber, id: old.id})
        .then(newPerson =>setPersons(persons.map(p => p.id !== old.id ? p : newPerson)))
        notify(`Henkilön ${old.name} numero muutettu`, false)
      }
      return
    }
    personService.add({ name: newName, number: newNumber }).then(x => {
    personService.getAll().then(res => setPersons(res))
    notify(`Lisättiin ${newName}`, false)
  })
  }

  const remove = (p) => {
    if (window.confirm(`Poistetaanko ${p.name}?`)) {
      personService
        .remove(p)
        .then(() => {
          setPersons(persons.filter(person => person.id !== p.id))
          notify(`Poistettiin ${p.name}`, false)
        })
        .catch(error => {
          notify('Numero on jo poistettu!', true)
        })
    }
  }

  const updateName = (event) => setNewName(event.target.value)
  const updateNumber = (event) => setNewNumber(event.target.value)
  const updateFilter = (event) => setFilter(event.target.value)

  const notify = (message, error) => {
    setNotification({message: message, error: error})
    setTimeout(
      () => {setNotification(null)}, 2000
    )
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={notification} />

      <Filter filter = {filter} updateFilter = {updateFilter}/>
      <h2> Lisää uusi </h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        updateName={updateName}
        newNumber={newNumber}
        updateNumber={updateNumber}
      />
      <h2>Numerot</h2>
      <Persons
      persons= {persons.filter(x => x.name.toLowerCase().includes(filter))}
      remove = {remove}
      />
    </div>
  )
}

export default App
