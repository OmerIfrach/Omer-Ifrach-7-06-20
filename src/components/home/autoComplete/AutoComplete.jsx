import React from 'react'
import classes from './AutoComplete.module.css'


const AutoComplete=props=>(
        <div  className={classes.autoCompleteContainer}>
            <input
             onBlur={props.focusFromAutoCompelteRemoved}
             placeholder="Enter city name..."
              className={classes.inputAutoComplete}
               value={props.autoCompleteText}
               onChange={props.inputChange}
               
               />
            {
                props.autoCompleteOptions.length>0?
                <div className={classes.autoCompleteDropdown}  onMouseEnter={()=>{props.updateIgnoreBlue(true)}} onMouseLeave={()=>{props.updateIgnoreBlue(false)}}>
                {
                    props.autoCompleteOptions.map((autoOption,i)=>{
                        return <div key={autoOption.Key} className={classes.dropdownItem} onClick={()=>{props.changeSelectedLocation(autoOption)}}>
                            {autoOption.LocalizedName}, {autoOption.Country.LocalizedName} 
                            </div>
                    })
                }
            </div>
            :null

            }
        </div>
)


export default AutoComplete