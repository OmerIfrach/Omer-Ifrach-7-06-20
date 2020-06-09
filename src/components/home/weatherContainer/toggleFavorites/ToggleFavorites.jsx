import React from 'react'
import classes from './ToggleFavorites.module.css'



const ToggleFavorites=props=>{
    let btnText=`Add ${props.currentCityLocation.cityName} to Favorites`
    if(props.isCurrentFavorite){
        btnText=`Remove ${props.currentCityLocation.cityName} from Favorites`
    }
    return(
        <div className={classes.ToggleFavorites}>
            <button onClick={props.addToFavorite}>{btnText}</button>
        </div>
    )
}

export default ToggleFavorites

