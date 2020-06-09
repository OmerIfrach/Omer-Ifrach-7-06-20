import React,{useState} from 'react'
import classes from './Navbar.module.css'
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