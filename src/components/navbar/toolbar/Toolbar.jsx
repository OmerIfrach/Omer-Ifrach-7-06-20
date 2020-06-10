import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../navigationItems/NavigationItems'
import ToolbarToggles from './toolbarToggles/ToolbarToggles'
import Burger from './burger/Burger'

const Toolbar=props=>(

    <header className={classes.ToolbarContainer}>
        <div className={classes.ToolbarTitle}>Herolo Weather Task</div>
        <ToolbarToggles/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
        <Burger toggleSideDrawer={props.toggleSideDrawer}/>
    </header>
);

export default Toolbar