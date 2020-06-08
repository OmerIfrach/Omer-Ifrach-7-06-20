import React,{useState,useEffect,Fragment } from 'react'
import classes from './SideDrawer.module.css'
import Backdrop from '../../../UI/backdrop/Backdrop'


const SideDrawer=props=>{
    let sideDrawerClasses=[classes.SideDrawer,classes.Close]

    if(props.show){
        sideDrawerClasses=[classes.SideDrawer,classes.Open]
    }

    
    return(
        <Fragment>

                <div>
                    <Backdrop show={props.show} clicked={props.toggleSideDrawer}/>
                    <div className={sideDrawerClasses.join(' ')}>
                    
                        aaa
                    </div>
                </div>


        </Fragment>
    )
}

export default SideDrawer