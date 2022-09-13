const CountryList = (props) => {
    return(
        <div>
            {props.countries.map((country, i) => <div key={i}>{country.name.common}</div>)}
        </div>
    )
}

export default CountryList