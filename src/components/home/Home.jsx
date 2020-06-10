import React,{useState,useEffect} from 'react'
import classes from './Home.module.css'
import axios from 'axios';
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'
import {autoCompleteUrl,currentConditionsUrl,forecastsUrl} from '../../accuWeatherServices/generateUrl'
import AutoComplete from './autoComplete/AutoComplete'
import WeatherContainer from './weatherContainer/WeatherContainer'
import queryString from 'query-string';

const Home=props=>{
    const [autoCompleteText,setAutoCompleteText]=useState('');
    const [ignoreBlur,setIgnoreBlur]=useState(false);
    const [autoCompleteOptions,setAutoCompleteOptions]=useState([]);
    const [currentCityWeather,setCurrentCityWeather]=useState(null);
    const [currentCityLocation,setCurrentCityLocation]=useState({
        countryName:"Israel",
        cityName:"Tel Aviv",
        cityKey:'215854'
    });
    const [currentLocationForecast,setCurrentLocationForecast]=useState([]);
    const [isCurrentFavorite,setIsCurrentFavorite]=useState(false);

    useEffect(()=>{

        let locationToQuery=currentCityLocation;
        getCityWeatherAndForecast(locationToQuery.cityKey)
        const newLocationIsFavorite=props.favorites.find(favoriteItem=>favoriteItem.cityKey===locationToQuery.cityKey);
        let res=false
        if(newLocationIsFavorite){
            res=true
        }
        setIsCurrentFavorite(res)
        
    },[currentCityLocation,props.favorites])

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
        .then((res)=>{
            console.log(res)
            setCurrentCityWeather(res.data[0])
            if(newCityLocation){
                setCurrentCityLocation(newCityLocation)
            }
        })
        .catch(err=>{
            console.log('got error')
        })
    }

    const getCityForecast=locationKey=>{
        const url = forecastsUrl(locationKey)
        axios.get(url)
        .then(res=>{
            console.log(res,'getCityForecast')
            setCurrentLocationForecast(res.data.DailyForecasts)
        })
        .catch(err=>{
            console.log('got error')
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
        const favoriteItem={...currentCityLocation}
        if(isCurrentFavorite){
            props.onRemoveFromFavorite(favoriteItem.cityKey)
        }
        else{
            props.onAddToFavorite(favoriteItem)
        }

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

const mapStateToProps=state=>{
    return{
        temType:state.temType,
        mode:state.mode,
        favorites:state.favorites
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAddToFavorite:(favoriteItem)=>dispatch({type:actionTypes.ADD_LOCATION_TO_FAVORITE,favoriteItem:favoriteItem}),
        onRemoveFromFavorite:(cityKey)=>dispatch({type:actionTypes.REMOVE_LOCATION_FROM_FAVORITE,cityKey:cityKey})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)