import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <div>capital: {country.capital}</div>
    <div>population: {country.population}</div>
    <h3>languages</h3>
    <ul>
      {country.languages.map(language => <Language key={language.name} language={language.name} />)}
    </ul>

    <img src={country.flag} width='200px' alt='flag' />
  </div>
)

const IndividualCountry = (props) => {
  return (
    <div>{props.name} <button type="button" onclick={props.getCountry(props.name)}>Show</button>
    </div>)
}

const Language = ( {language} ) => (
  <li> {language} </li>
)

const Form = (props) => (
  <div>
    find countries <input value={props.filter} onChange={props.updateFilter} />
  </div>
)

const Countries = (props) => {
  const countries = props.countries
  if (countries.length === 0) return null

  if (countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  if (countries.length === 1) {
    return(<Country country={countries[0]} />)
  }
  return countries.map(country => <IndividualCountry
    key={country.name}
    name={country.name}
    getCountry={props.getCountry()}/>)
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ oldFilter, setOldFilter ] = useState('')

  const updateFilter = (event) => setFilter(event.target.value)

  const getCountry = (x) => {
    axios
        .get(`https://restcountries.eu/rest/v2/name/${x}?fullText=true`)
        .then(response => {
          setCountries(response.data)
    })
  }

  if(filter !== '' && filter !== oldFilter){
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/name/' + filter)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    }

  return(
    <div>
      <Form filter={filter} updateFilter={updateFilter}/>
      <Countries
        countries = {countries}
        setCountries= {setCountries}
        getCountry={getCountry()}
      />
    </div>
  )
}

export default App
