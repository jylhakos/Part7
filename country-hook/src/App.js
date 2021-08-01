import React, { useState, useEffect } from 'react'

// $ npm install axios --save

import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// 7.7
const useCountry = (name) => {

  const [country, setCountry] = useState(null)

  useEffect(() => {

    console.log('effect', name)

    const url = 'https://restcountries.eu/rest/v2/name/' + name

    console.log('url', url)

    axios.get(url).then(response => {

        console.log('response', response.data[0])

        const data = {found: 'True', data: {name: response.data[0].name, capital: response.data[0].capital, population: response.data[0].population, flag: response.data[0].flag}}
        
        setCountry(data)
    })
  },[{country}])

  return country
}

const Country = ({country}) => {

  console.log('country', country)

  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {

  const nameInput = useField('text')

  const [name, setName] = useState('')

  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
