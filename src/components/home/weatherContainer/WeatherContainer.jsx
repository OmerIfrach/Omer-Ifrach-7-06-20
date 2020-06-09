import React from 'react'
import classes from './WeatherContainer.module.css'
import CurrWeather from './currWeather/CurrWeather'
import ToggleFavorites from './toggleFavorites/ToggleFavorites'
import Forecast from './forecast/Forecast'

const WeatherContainer=props=>(
    <div className={classes.WeatherContainer} >
        <CurrWeather currentCityWeather={props.currentCityWeather} currentCityLocation={props.currentCityLocation}/>
        <ToggleFavorites currentCityLocation={props.currentCityLocation} isCurrentFavorite={props.isCurrentFavorite} addToFavorite={props.addToFavorite}/>
        <Forecast currentLocationForecast={props.currentLocationForecast}/>
    </div>
)

export default WeatherContainer