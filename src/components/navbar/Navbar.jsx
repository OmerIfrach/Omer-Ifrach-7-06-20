import React,{useState} from 'react'
import classes from './Navbar.module.css'
import Toolbar from './toolbar/Toolbar'
import SideDrawer from './sideDrawer/SideDrawer'


const Navbar=props=>{
    const [showSideDrawer,setShowSideDrawer]=useState(false)

    const toggleSideDrawer=()=>{
        setShowSideDrawer(!showSideDrawer)
    }

    let navbarStyle=[classes.NavbarContainer,classes.NavbarLightMode]
    if(props.mode){
        navbarStyle=[classes.NavbarContainer,classes.NavbarDarkMode]
    }

    return(
        <div className={navbarStyle.join(' ')}>
            <Toolbar toggleSideDrawer={toggleSideDrawer} />
            <SideDrawer toggleSideDrawer={toggleSideDrawer} show={showSideDrawer} mode={props.mode}/>
        </div>
    )
}

export default Navbar