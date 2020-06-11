import React from 'react'
import classes from './FavoriteCard.module.css'
import { getWeatherIcon } from '../../../accuWeatherServices/generateUrl'
import Button from '../../../UI/button/Button'

const FavoriteCard = props => {
    let temData = `${props.favoriteData.Temperature.Imperial.Value}° ${props.favoriteData.Temperature.Imperial.Unit}`
    if (props.temType) {
        temData = `${props.favoriteData.Temperature.Metric.Value}° ${props.favoriteData.Temperature.Metric.Unit}`
    }

    let FavoriteCardStyle = [classes.FavoriteCard, classes.FavoriteCardLightMode]
    if (props.mode) {
        FavoriteCardStyle = [classes.FavoriteCard, classes.FavoriteCardDarkMode]
    }

    const goToHomeWithLocation = () => {
        props.history.push(`/?cityKey=${props.favoriteData.cityKey}&cityName=${props.favoriteData.cityName}&countryName=${props.favoriteData.countryName}`)
    }

    return (
        <div className={FavoriteCardStyle.join(' ')} onClick={goToHomeWithLocation}>
            <span>{props.favoriteData.cityName}</span>
            <span>{props.favoriteData.WeatherText}</span>
            <span>{temData}</span>
            <img src={getWeatherIcon(props.favoriteData.WeatherIcon)} alt={props.favoriteData.WeatherText} />
            <Button clicked={props.removeFromFavorites} type='danger'>Remove</Button>
        </div>
    )
}





export default FavoriteCard

