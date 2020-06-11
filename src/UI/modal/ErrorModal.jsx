import React,{Fragment} from 'react'
import classes from './ErrorModal.module.css'
import Backdrop from '../backdrop/Backdrop'
import Button from '../button/Button'

const Modal=props=>{
    let modalStyleClasses=[classes.ModalStyle,classes.Close];

    if(props.show) {
        modalStyleClasses=[classes.ModalStyle,classes.Open]
    }


    return(

    <Fragment>
            <Backdrop show={props.show} clicked={props.clicked}/>

            <div className={modalStyleClasses.join(' ')}>
                <span className={classes.ModalTitle}>Error</span>
                <span className={classes.ModalError}>{props.error}</span>
                <Button type='danger' clicked={props.clicked}>Dismiss</Button>
            </div>

    </Fragment>
)};

export default Modal