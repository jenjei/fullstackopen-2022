import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    console.log(value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(name)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    console.log('effect run, country is now', name)

    setIsLoading(true)
    setError(false)

      console.log('fetching country...')
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(response => {
          setCountry(response.data)
          console.log('response.data',country)
        })
        .catch(() => {
          console.log('error')
          setError(true)
          setIsLoading(false)
          setCountry(null)
        })
    },[name])

  return country
}

const Country = ({ country }) => {
  console.log('On Country component', country)
  if (country===null) { // if country doesnt exist
    return null
  } 

  if (country.found) {
    console.log(!country.found)
    return (
      <div>
        not found...
      </div>
    )
  }
  if (country!==null) {
    return (
      <div>
        <h3>{country[0].name.common} </h3>
        <div>capital {country[0].capital} </div>
        <div>population {country[0].population}</div> 
        <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/>  
      </div>
    )
  }
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
        <button type="submit">find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App