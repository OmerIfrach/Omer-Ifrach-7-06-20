import React,{useState,useEffect } from 'react'
import classes from './Navbar.module.css'
import NavigationItems from './navigationItems/NavigationItems'
import Toolbar from './toolbar/Toolbar'
import SideDrawer from './sideDrawer/SideDrawer'


const Navbar=props=>{
    const [showSideDrawer,setShowSideDrawer]=useState(false)

    const toggleSideDrawer=()=>{
        setShowSideDrawer(!showSideDrawer)
    }

    return(
        <div className={classes.NavbarContainer}>
            <Toolbar toggleSideDrawer={toggleSideDrawer}/>
            <SideDrawer toggleSideDrawer={toggleSideDrawer} show={showSideDrawer}/>
        </div>
    )
}

export default Navbar