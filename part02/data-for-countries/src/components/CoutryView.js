const CountryView = (props) => {


    const languages = []
    Object.keys(props.country.languages).forEach(key =>{
        languages.push(props.country.languages[key])
    })


    return(
        <div>
            <h1>{props.country.name.common}</h1>
            <div>capital {props.country.capital}</div>
            <div>area {props.country.area}</div>
            <h2>languages:</h2>
            <ul>
                {languages.map((language, i) => <li key={i}>{language}</li>)}
            </ul>
            
            <div>
                <img src={props.country.flags.png} alt={"flag of "+ props.country.name.common}/>
            </div>
        </div>
    )
}

export default CountryView