import React from 'react'
import classes from './WeatherContainer.module.css'
import CurrWeather from './currWeather/CurrWeather'
import ToggleFavorites from './toggleFavorites/ToggleFavorites'
import Forecast from './forecast/Forecast'


const WeatherContainer=props=>(
    <div>
        <CurrWeather currentCityWeather={props.currentCityWeather}/>
        <ToggleFavorites/>
        <Forecast/>
    </div>
)

export default WeatherContainer