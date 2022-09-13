import CountryView from "./CoutryView"
import CountryList from "./CountryList"

const CountryGlobalView = (props) => {
    if(props.countries.length === 0){
        return(
            <div>No mathch, specify another filter</div>
        )
    }else if(props.countries.length === 1){
        return(
            <div>
                <CountryView country={props.countries[0]}/>
            </div>
        )
    }else if(props.countries.length < 10){
        return(
            <div>
                <CountryList countries={props.countries}/>
            </div>
        )
    }else{
        return(
            <div>Too many matches, specify another filter</div>
        )
    }
    
}

export default CountryGlobalView