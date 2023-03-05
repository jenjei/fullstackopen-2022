
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Countries from './components/Countries'



const App = () => {
  const [countries, setCountries] = useState([]) // data from api
  const [countryFilter, setNewFilter] = useState('')


  useEffect(() => { // fetching data with axios
    console.log('country effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('country promise fulfilled')
        console.log(response.data)
        console.log('length', response.data.length)
        setCountries(response.data)
      })
  }, [])


  return (
    <div className='App'>
    <form >
      <div>
      <input placeholder='Search Country...' onChange={event => setNewFilter(event.target.value)}/>
      </div>
    </form>
    <Countries filter={countryFilter} countries={countries} />
    </div>
  );
}

export default App;
