import React, { Fragment } from 'react'
import classes from './CurrWeather.module.css'
import { getWeatherIcon } from '../../../../accuWeatherServices/generateUrl'

const CurrWeather = props => {
    let temToDisplay = `${props.currentCityWeather.Temperature.Imperial.Value}° ${props.currentCityWeather.Temperature.Imperial.Unit}`

    if (props.temType) {
        temToDisplay = `${props.currentCityWeather.Temperature.Metric.Value}° ${props.currentCityWeather.Temperature.Metric.Unit}`
    }



    return (
        <Fragment>
            <div className={classes.currWeather}>
                <span>{props.currentCityLocation.countryName}</span>
                <span>{props.currentCityLocation.cityName}</span>
                <span>{temToDisplay}</span>
            </div>
            <div className={classes.currWeatherPartTwo}>
                <img src={getWeatherIcon(props.currentCityWeather.WeatherIcon)} alt={props.currentCityWeather.WeatherText}></img>
                <span>{props.currentCityWeather.WeatherText}</span>
            </div>
        </Fragment>
    )
}

export default CurrWeather