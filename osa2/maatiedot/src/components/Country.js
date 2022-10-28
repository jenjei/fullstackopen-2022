
const Country = ({country}) => {
    return (
      <div className='App'>
        <h2>{country.name.official}</h2>
        <img src={country.flags.png}></img>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Continent: {country.continents}</p>
        <p>Time Zone: from {country.timezones[0]} to {country.timezones[country.timezones.length-1]}</p>
        <a href={country.maps.googleMaps} target="_blank">Check the location on GoogleMaps!</a>
      </div>
    )
}
export default Country