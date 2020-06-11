import React from 'react'
import classes from './Forecast.module.css'
import ForecastCard from './forecastCard/ForecastCard'



const Forecast=props=>(
    <div className={classes.Forecast}>
        {
            props.currentLocationForecast.map(forecast=>{
                return <ForecastCard forecast={forecast} key={forecast.EpochDate} mode={props.mode}/>
            })
        }
    </div>
)

export default Forecast