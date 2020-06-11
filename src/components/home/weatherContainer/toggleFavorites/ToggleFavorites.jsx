import React from 'react'
import classes from './ToggleFavorites.module.css'



const ToggleFavorites=props=>{


    let heartStyle=[classes.heart]
    if(props.isCurrentFavorite){
        heartStyle.push(classes.activated)
    }

    return(
        <div className={classes.ToggleFavorites}>
            <div className={heartStyle.join(' ')} onClick={props.addToFavorite}>❤</div>
        </div>
    )
}

export default ToggleFavorites

