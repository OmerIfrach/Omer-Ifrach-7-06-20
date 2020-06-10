import React from 'react'
import classes from './ToolbarToggles.module.css'
import {connect} from 'react-redux'
import * as actionTypes from '../../../../store/actions'



const ToolbarToggles=props=>(

    <div>
        <button onClick={props.onToggleTemType}>{props.temType?'C':'F'}</button>
        <button onClick={props.onToggleMode}>{props.mode?'dark':'light'}</button>
    </div>
);

const mapStateToProps=state=>{
    return{
        temType:state.temType,
        mode:state.mode
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onToggleTemType:()=>dispatch({type:actionTypes.TOGGLE_TEMPERTURE_TYPE}),
        onToggleMode:()=>dispatch({type:actionTypes.TOGGLE_MODE})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ToolbarToggles)