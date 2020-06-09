import React,{useState,useEffect} from 'react'
import classes from './Home.module.css'
import axios from 'axios';
import {autoCompleteUrl,currentConditionsUrl} from '../../accuWeatherServices/generateUrl'
import AutoComplete from './autoComplete/AutoComplete'
import WeatherContainer from './weatherContainer/WeatherContainer'

const Home=props=>{
    const [autoCompleteText,setAutoCompleteText]=useState('')
    const [autoCompleteOptions,setAutoCompleteOptions]=useState([])
    const [currentCityWeather,setCurrentCityWeather]=useState(null)

    useEffect(()=>{
        const url=currentConditionsUrl('215854')
        axios.get(url)
        .then(res=>{
            console.log(res)
            setCurrentCityWeather(res.data[0])
        })
    },[])

    useEffect(()=>{
        const url=autoCompleteUrl(autoCompleteText)
        if(autoCompleteText){
            axios.get(url)
            .then(res=>{
                console.log(res)
                setAutoCompleteOptions(res.data)
            })
        }
    },[autoCompleteText])



    const autoCompleteChangeHandler=(event)=>{
        setAutoCompleteText(event.target.value)
    }

    const focusFromAutoCompelteRemoved=()=>{
        setAutoCompleteText('')
        setAutoCompleteOptions('')
    }
    return(
        <div className={classes.HomeContainer}>
            <AutoComplete 
            autoCompleteText={autoCompleteText}
            inputChange={autoCompleteChangeHandler}
            autoCompleteOptions={autoCompleteOptions}
            focusFromAutoCompelteRemoved={focusFromAutoCompelteRemoved}
            />
            {
                currentCityWeather?
                <WeatherContainer
                currentCityWeather={currentCityWeather}
                />
                :null
            }
        </div>
    );
}

export default Home