import { useState, useEffect } from "react";
import axios from 'axios'
import Search from "./components/Search";
import CountryGlobalView from "./components/CountryGlobalView";

function App() {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const countriesToShow = countries.filter(entry => entry.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    

  const handleSearchChange = (event) =>{setNewSearch(event.target.value)}

  return (
    <div>
      <Search label={"find countries: "} initialValue={newSearch} handleChange={handleSearchChange}/>
      <CountryGlobalView countries={countriesToShow}/>
    </div>
  )
}

export default App;
