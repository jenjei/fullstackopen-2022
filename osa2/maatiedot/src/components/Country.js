import { useEffect, useState } from "react"
import axios
 from "axios"
const Country = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const base_url = 'https://api.openweathermap.org/data/2.5/weather?q='
  const capital_url = country.capital
  const complete_weather_url = base_url + capital_url + '&appid=' + api_key
  const [weather, setWeather] = useState([]) // api data
  // var icon_code = weather.weather[0].icon
  // const complete_icon_url = 'http://openweathermap.org/img/wn/' + icon_code +'@2x.png'

  useEffect(() => { // fetching data with axios
    console.log('weather effect')
    axios
      .get(complete_weather_url)
      .then(response => {
        console.log('weather promise fulfilled')
        console.log(response.data)
        setWeather(response.data)
      })
  }, [])

    return (
      <div className='App'>
        <h2>{country.name.official}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Area: {country.area} square kilometer</p>
        <h3>Language(s)</h3>
        {Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li>)}
        <br />
        <img src={country.flags.png}></img>
        <h3>Current weather</h3>
        <p>Temperature: {(weather.main?.temp - 273.15).toFixed(1)} Celcius </p>
        <img></img>
        <p>Wind {weather.wind?.speed} m/s</p>
      </div>
    )
}
export default Country