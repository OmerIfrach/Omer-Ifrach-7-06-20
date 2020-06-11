import React from 'react'
import classes from './Background.module.css'

const Background = props => {

    let backgroundClass = classes.BackgroundLight
    if (props.mode) {
        backgroundClass = classes.BackgroundDark
    }


    return (
        <div className={backgroundClass} />
    )
};

export default Background