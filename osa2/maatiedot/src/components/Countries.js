import Country from "./Country"

const Countries = ({filter, countries}) => {
    const countriesFiltered = countries.filter(country =>
      country.name.official.toLowerCase().includes(filter.toLowerCase()))
    
    
    const handleShowClick = ({}) => {

    }
    
    if (countriesFiltered.length === 1) {
      return (
          <div key={countriesFiltered[0].name}>
            <Country country={countriesFiltered[0]} />
          </div>
      )
    } else if (countriesFiltered.length <= 10) {
      return (
        countriesFiltered.map(country =>
          <form key={country.name.official} value={country} onSubmit={handleShowClick}>
            <p>{country.name.official} <button type='submit'>show</button>
            </p>
          </form>
        )
      )
    } else {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
  }

  export default Countries