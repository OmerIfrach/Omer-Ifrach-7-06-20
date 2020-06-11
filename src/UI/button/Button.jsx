import React from 'react'
import classes from './Button.module.css'

const Button = props => (
    <button className={classes[props.type]} onClick={props.clicked}>{props.children}</button>
);

export default Button