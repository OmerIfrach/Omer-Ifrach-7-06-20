import React from 'react'
import classes from './ForecastCard.module.css'
import {getWeatherIcon} from '../../../../../accuWeatherServices/generateUrl'

const dayByIndex=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const ForecastCard=props=>{

    const dayToDisplay=dayByIndex[new Date(props.forecast.Date).getDay()]


return (
    <div className={classes.ForecastCard}>
            <span>{dayToDisplay}</span>
            <span>{props.forecast.Day.IconPhrase}</span>
            <span>{props.forecast.Temperature.Maximum.Value}° | {props.forecast.Temperature.Minimum.Value}°</span>
            <img src={getWeatherIcon(props.forecast.Day.Icon)} alt={props.forecast.Day.IconPhrase}/>


    </div>
)
}

export default ForecastCard

                // return <div>{forecast.Day.IconPhrase}</div>