import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './navigationItem/NavigationItem'

const NavigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={!window.location.href.includes('favorites')}>Home</NavigationItem>
        <NavigationItem link="/favorites" active={window.location.href.includes('favorites')}>Favorites</NavigationItem>
    </ul>
);

export default NavigationItems