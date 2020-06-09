import React,{useState,useEffect} from 'react'
import classes from './Home.module.css'
import axios from 'axios';
import {autoCompleteUrl,currentConditionsUrl,forecastsUrl} from '../../accuWeatherServices/generateUrl'
import AutoComplete from './autoComplete/AutoComplete'
import WeatherContainer from './weatherContainer/WeatherContainer'

const Home=props=>{
    const [autoCompleteText,setAutoCompleteText]=useState('')
    const [ignoreBlur,setIgnoreBlur]=useState(false)
    const [autoCompleteOptions,setAutoCompleteOptions]=useState([])
    const [currentCityWeather,setCurrentCityWeather]=useState(null)
    const [currentCityLocation,setCurrentCityLocation]=useState({
        countryName:"Israel",
        cityName:"Tel Aviv",
        cityKey:'215854'
    })
    const [currentLocationForecast,setCurrentLocationForecast]=useState([])
    const [isCurrentFavorite,setIsCurrentFavorite]=useState(false)

    useEffect(()=>{
        getCityWeatherAndForecast('215854')

        let userPref=localStorage.getItem('userPrefrence')
        if(userPref){
            userPref=JSON.parse(userPref)
            const isFavorite=userPref.favorites.find(locationKey=>locationKey===currentCityLocation.cityKey)
            setIsCurrentFavorite(isFavorite?true:false)
        }


    },[])

    // useEffect(()=>{

    // },[isCurrentFavorite])

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

    const getCityWeatherAndForecast=(cityKey,newCityLocation)=>{
        getCityWeatherByKey(cityKey,newCityLocation)
        getCityForecast(cityKey)
    }

    const getCityWeatherByKey=(cityKey,newCityLocation)=>{
        const url=currentConditionsUrl(cityKey)
        axios.get(url)
        .then(res=>{
            console.log(res)
            setCurrentCityWeather(res.data[0])
            if(newCityLocation){
                setCurrentCityLocation(newCityLocation)
            }
        })
    }

    const getCityForecast=locationKey=>{
        const url = forecastsUrl(locationKey)
        axios.get(url)
        .then(res=>{
            console.log(res,'getCityForecast')
            setCurrentLocationForecast(res.data.DailyForecasts)
        })
    }

    const autoCompleteChangeHandler=(event)=>{
        setAutoCompleteText(event.target.value)
    }
    const updateIgnoreBlue=(toIgnore)=>{
        setIgnoreBlur(toIgnore)
    }

    const focusFromAutoCompelteRemoved=()=>{
        if(!ignoreBlur){
            setAutoCompleteText('')
            setAutoCompleteOptions('')
        }
    }


    const changeSelectedLocation=(autoCompleteOption)=>{
        setAutoCompleteText('')
        setAutoCompleteOptions('')

        const newCityLocation={
            countryName:autoCompleteOption.Country.LocalizedName,
            cityName:autoCompleteOption.LocalizedName,
            cityKey:autoCompleteOption.Key
        }
        getCityWeatherAndForecast(autoCompleteOption.Key,newCityLocation)
    }

    const addToFavorite=()=>{
        setIsCurrentFavorite(!isCurrentFavorite)

    }

    return(
        <div className={classes.HomeContainer}>
            <AutoComplete 
                autoCompleteText={autoCompleteText}
                inputChange={autoCompleteChangeHandler}
                autoCompleteOptions={autoCompleteOptions}
                focusFromAutoCompelteRemoved={focusFromAutoCompelteRemoved}
                changeSelectedLocation={changeSelectedLocation}
                updateIgnoreBlue={updateIgnoreBlue}
            />
            {
                currentCityWeather?
                <WeatherContainer
                currentCityWeather={currentCityWeather}
                currentCityLocation={currentCityLocation}
                currentLocationForecast={currentLocationForecast}
                isCurrentFavorite={isCurrentFavorite}
                addToFavorite={addToFavorite}
                />
                :null
            }
        </div>
    );
}

export default Home