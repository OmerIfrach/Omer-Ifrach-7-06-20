import React from 'react'
import classes from './CurrWeather.module.css'


const CurrWeather=props=>{
    let temToDisplay=`${props.currentCityWeather.Temperature.Imperial.Value}° ${props.currentCityWeather.Temperature.Imperial.Unit}`

    if(props.temType){
        temToDisplay=`${props.currentCityWeather.Temperature.Metric.Value}° ${props.currentCityWeather.Temperature.Metric.Unit}`
    }



    return(
        <div className={classes.currWeather}>
            <span>{props.currentCityLocation.countryName}</span>
            <span>{props.currentCityLocation.cityName}</span>
            <span>{temToDisplay}</span>
        </div>
    )
}

export default CurrWeather