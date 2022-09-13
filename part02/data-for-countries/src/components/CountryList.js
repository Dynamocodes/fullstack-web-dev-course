import CountryView from "./CoutryView"
const CountryList = (props) => {

    
    return(
        <div>
            {props.countries.map((country, i) =>
            <div key={i}>
                {country.name.common} <button id={country.name.common} onClick={props.handleClick}>{country.show ? "hide" : "show"}</button>
                {country.show ? <CountryView country={country}/> : <div></div>}
            </div>
            )}
        </div>
    )
}

export default CountryList