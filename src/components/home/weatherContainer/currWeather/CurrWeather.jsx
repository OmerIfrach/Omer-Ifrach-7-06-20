import React from 'react'
import classes from './CurrWeather.module.css'


const CurrWeather=props=>(
    <div className={classes.currWeather}>
        <span>{props.currentCityLocation.countryName}</span>
        <span>{props.currentCityLocation.cityName}</span>
        <span>{props.currentCityWeather.Temperature.Imperial.Value}° {props.currentCityWeather.Temperature.Imperial.Unit}</span>
    </div>
)

export default CurrWeather