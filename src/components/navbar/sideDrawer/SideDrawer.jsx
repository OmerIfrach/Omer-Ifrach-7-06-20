import React,{Fragment } from 'react'
import classes from './SideDrawer.module.css'
import Backdrop from '../../../UI/backdrop/Backdrop'
import NavigationItems from '../navigationItems/NavigationItems'
import ToolbarToggles from '../toolbarToggles/ToolbarToggles'

const SideDrawer=props=>{
    let sideDrawerClasses=[classes.SideDrawer,classes.Close]

    if(props.show){
        sideDrawerClasses=[classes.SideDrawer,classes.Open]
    }

    if(props.mode){
        sideDrawerClasses.push(classes.SideDrawerDarkMode)
    }
    else{
        sideDrawerClasses.push(classes.SideDrawerLightMode)
    }

    
    return(
        <Fragment>

                <div>
                    <Backdrop show={props.show} clicked={props.toggleSideDrawer}/>
                    <div className={sideDrawerClasses.join(' ')}>
                    
                        <NavigationItems/>
                        <ToolbarToggles/>
                    </div>
                </div>


        </Fragment>
    )
}

export default SideDrawer