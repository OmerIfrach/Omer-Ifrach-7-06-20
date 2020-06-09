import React from 'react'
import classes from './AutoComplete.module.css'

const languageOptions = [
    { key: 'Arabic', text: 'Arabic', value: 'Arabic' },
    { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
    { key: 'Danish', text: 'Danish', value: 'Danish' },
    { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
    { key: 'English', text: 'English', value: 'English' },
    { key: 'French', text: 'French', value: 'French' },
    { key: 'German', text: 'German', value: 'German' },
    { key: 'Greek', text: 'Greek', value: 'Greek' },
    { key: 'Hungarian', text: 'Hungarian', value: 'Hungarian' },
    { key: 'Italian', text: 'Italian', value: 'Italian' },
    { key: 'Japanese', text: 'Japanese', value: 'Japanese' },
    { key: 'Korean', text: 'Korean', value: 'Korean' },
    { key: 'Lithuanian', text: 'Lithuanian', value: 'Lithuanian' },
    { key: 'Persian', text: 'Persian', value: 'Persian' },
    { key: 'Polish', text: 'Polish', value: 'Polish' },
    { key: 'Portuguese', text: 'Portuguese', value: 'Portuguese' },
    { key: 'Russian', text: 'Russian', value: 'Russian' },
    { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
    { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
    { key: 'Turkish', text: 'Turkish', value: 'Turkish' },
    { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
  ]


const AutoComplete=props=>(
        <div onBlur={props.focusFromAutoCompelteRemoved} className={classes.autoCompleteContainer}>
            <input
             placeholder="Enter city name..."
              className={classes.inputAutoComplete}
               value={props.autoCompleteText}
               onChange={props.inputChange}/>
            {
                props.autoCompleteOptions.length>0?
                <div className={classes.autoCompleteDropdown}>
                {
                    props.autoCompleteOptions.map((autoOption,i)=>{
                        return <div key={autoOption.Key} className={classes.dropdownItem}>{autoOption.LocalizedName}, {autoOption.Country.LocalizedName}</div>
                    })
                }
            </div>
            :null

            }
        </div>
)


export default AutoComplete