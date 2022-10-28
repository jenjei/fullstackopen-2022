import Country from "./Country"

const Countries = ({filter, countries}) => {
    const countriesFiltered = countries.filter(country =>
      country.name.official.toLowerCase().includes(filter.toLowerCase()))
    
    if (countriesFiltered.length === 1) {
      return (
          <div key={countriesFiltered[0].name}>
            <Country country={countriesFiltered[0]} />
          </div>
      )
    } else if (countriesFiltered.length <= 10) {
      return (
        countriesFiltered.map(country =>
          <div key={country.name.official}>
            <p>{country.name.official}</p>
          </div>
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