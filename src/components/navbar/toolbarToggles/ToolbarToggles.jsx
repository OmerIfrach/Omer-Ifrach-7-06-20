import React from 'react'
import classes from './ToolbarToggles.module.css'
import {connect} from 'react-redux'
import * as actionTypes from '../../../store/actions'
import Switch from "react-switch";

const toggleBasicSettings={
    uncheckedIcon:false,
    checkedIcon:false,
    width:28,
    height:14
}

const toggleSettingsMode={
    offColor:'#00001a',
    onColor:'#00ccff',
    ...toggleBasicSettings
}

const toggleSettingsTemType={
    offColor:'#808080',
    onColor:'#2185d0',
    ...toggleBasicSettings
}

const ToolbarToggles=props=>(

    <div className={classes.ToolbarToggles}>
        <span>
            F° <Switch onChange={props.onToggleTemType} checked={props.temType} {...toggleSettingsTemType} /> C°
        </span>
        <span>
            Light <Switch onChange={props.onToggleMode} checked={props.mode} {...toggleSettingsMode} /> Dark
        </span>
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