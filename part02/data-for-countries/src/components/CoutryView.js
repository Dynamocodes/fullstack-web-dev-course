import axios from 'axios'
import { useState, useEffect } from 'react'

const CountryView = (props) => {

    const API_KEY = process.env.REACT_APP_API_KEY
    console.log(API_KEY)
    const KELVIN_OFFSET = 273.15

    /* initiating the useState with a "template" weather object */
    const tmp = {
        "coord": {
        "lon": 24.93,
        "lat": 60.17
        },
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "base": "stations",
        "main": {
        "temp": 284.67,
        "feels_like": 284.25,
        "temp_min": 283.9,
        "temp_max": 285.34,
        "pressure": 992,
        "humidity": 91
        },
        "visibility": 6000,
        "wind": {
        "speed": 6.69,
        "deg": 120
        },
        "rain": {
        "1h": 0.6
        },
        "clouds": {
        "all": 75
        },
        "dt": 1663144391,
        "sys": {
        "type": 2,
        "id": 2011913,
        "country": "FI",
        "sunrise": 1663127108,
        "sunset": 1663174022
        },
        "timezone": 10800,
        "id": 658225,
        "name": "Helsinki",
        "cod": 200
    }
    const [newWeather, setNewWeather] = useState(tmp)

    /* extracting languages */
    const languages = []
    Object.keys(props.country.languages).forEach(key =>{
        languages.push(props.country.languages[key])
    })

    const weatherData = (lat, long) => {
        axios
        .get('https://api.openweathermap.org/data/2.5/weather?lat=' 
                + lat 
                + '&lon=' 
                + long 
                + '&appid='
                + API_KEY)
        .then(response => {setNewWeather(response.data)})
    }
    
    useEffect(()=>weatherData(props.country.capitalInfo.latlng[0], props.country.capitalInfo.latlng[1]), [])

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
            <h2>Weather in {props.country.capital}</h2>
            <div>temperature {newWeather.main.temp - KELVIN_OFFSET} Celsius</div>
            <img src={'http://openweathermap.org/img/wn/' + newWeather.weather[0].icon + '@2x.png'}/>
        </div>
    )
}

export default CountryView