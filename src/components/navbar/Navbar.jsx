import React, { useState } from 'react'
import classes from './Navbar.module.css'
import Toolbar from './toolbar/Toolbar'
import SideDrawer from './sideDrawer/SideDrawer'
import lightModeIcon from '../../assets/images/light_mode_icon.png'
import darkModeIcon from '../../assets/images/dark_mode_icon.png'

const Navbar = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const toggleSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    let navbarStyle = [classes.NavbarContainer, classes.NavbarLightMode]
    if (props.mode) {
        navbarStyle = [classes.NavbarContainer, classes.NavbarDarkMode]
    }
    let iconOfNavbar = lightModeIcon
    if (props.mode) {
        iconOfNavbar = darkModeIcon
    }

    return (
        <div className={navbarStyle.join(' ')}>
            <Toolbar toggleSideDrawer={toggleSideDrawer} icon={iconOfNavbar} />
            <SideDrawer toggleSideDrawer={toggleSideDrawer} show={showSideDrawer} mode={props.mode} />
        </div>
    )
}

export default Navbar