import React from 'react'
import classes from './Burger.module.css'


const Burger=props=>(
    <div className={classes.BurgerMenu} onClick={props.toggleSideDrawer}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default Burger