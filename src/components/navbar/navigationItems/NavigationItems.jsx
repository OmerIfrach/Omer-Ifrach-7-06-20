import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './navigationItem/NavigationItem'

const NavigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={true}>Home</NavigationItem>
        <NavigationItem link="/favorites" active={false}>Favorites</NavigationItem>
    </ul>
);

export default NavigationItems