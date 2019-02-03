import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState(null)

useEffect(() => {
  axios.get(`https://api.apixu.com/v1/current.json?key=10064d04816b4b34aad230504190302&q=${country.capital}`).then(result => {
    console.log(result.data.current)
    setWeather(result.data.current)
  })
}, [])

  return(
  <div>
    <h2>{country.name}</h2>
    <div>capital: {country.capital}</div>
    <div>population: {country.population}</div>
    <h3>languages</h3>
    <ul>
      {country.languages.map(language => <Language key={language.name} language={language.name} />)}
    </ul>

    <img src={country.flag} width='200px' alt='flag' />
        <h2> Weather in {country.capital} </h2>
    <Weather weather = {weather} />

  </div>
)
}

const IndividualCountry = (props) => {
  return (
    <div>{props.name} <button type="button" onClick={props.click}>Show</button>
    </div>)
}

const Weather = ( {weather} ) => {
  if(!weather) {return null}
  return(
    <>
      <div>
      Temperature: {weather.temp_c} Celcius
      </div>
      <div>
      <img src={'https:' + (weather.condition ? weather.condition.icon : '//via.placeholder.com/150')} />
      </div>
      <div>
      <b>Wind: </b>{weather.wind_kph} kph, direction {weather.wind_dir}
    </div>
  </>)
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
    click={() => props.getCountry(country.name)}/>)
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
    axios
      .get('https://restcountries.eu/rest/v2/name/' + filter)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
      setOldFilter(filter)
    }

  return(
    <div>
      <Form filter={filter} updateFilter={updateFilter}/>
      <Countries
        countries = {countries}
        setCountries= {setCountries}
        getCountry={getCountry}
      />
    </div>
  )
}

export default App
