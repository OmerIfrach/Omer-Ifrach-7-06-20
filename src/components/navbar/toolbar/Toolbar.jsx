import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../navigationItems/NavigationItems'
import ToolbarToggles from '../toolbarToggles/ToolbarToggles'
import Burger from './burger/Burger'


const Toolbar=props=>(

    <header className={classes.ToolbarContainer}>
        <div className={classes.NavbarTitleAndIcon}>
            <img src={props.icon} alt='navbarIcon'/>
            <div className={classes.ToolbarTitle}>Herolo Weather Task</div>
        </div>
        <nav className={[classes.DesktopOnly,classes.DesktopOnlyTogglersStyle].join(' ')}>
            <ToolbarToggles/>
        </nav>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
        <Burger toggleSideDrawer={props.toggleSideDrawer}/>
    </header>
);

export default Toolbar

