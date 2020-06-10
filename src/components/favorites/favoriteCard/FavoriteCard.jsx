import React from 'react'
import classes from './FavoriteCard.module.css'
import {getWeatherIcon} from '../../../accuWeatherServices/generateUrl'

const FavoriteCard=props=>{
    let temData=`${props.favoriteData.Temperature.Imperial.Value}° ${props.favoriteData.Temperature.Imperial.Unit}`
    if(props.temType){
        temData=`${props.favoriteData.Temperature.Metric.Value}° ${props.favoriteData.Temperature.Metric.Unit}`
    }

    const goToHomeWithLocation=()=>{
        props.history.push(`/?cityKey=${props.favoriteData.cityKey}&cityName=${props.favoriteData.cityName}&countryName=${props.favoriteData.countryName}`)
    }

    return(
        <div className={classes.FavoriteCard}>
            <span>{props.favoriteData.cityName}</span>
            <span>{props.favoriteData.WeatherText}</span>
            <span>{temData}</span>
            <img src={getWeatherIcon(props.favoriteData.WeatherIcon)} alt={props.favoriteData.WeatherText}/>
            <button onClick={goToHomeWithLocation}>Show Forecast</button>
            <button onClick={props.removeFromFavorites}>Remove</button>
        </div>
    )
}





export default FavoriteCard

