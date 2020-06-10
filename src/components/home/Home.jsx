import React,{useState,useEffect,useCallback} from 'react'
import classes from './Home.module.css'
import axios from 'axios';
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'
import {autoCompleteUrl,currentConditionsUrl,forecastsUrl} from '../../accuWeatherServices/generateUrl'
import AutoComplete from './autoComplete/AutoComplete'
import WeatherContainer from './weatherContainer/WeatherContainer'
import ErrorModal from '../../UI/modal/ErrorModal'
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
    const [showErrorModal,setShowErrorModal]=useState({
        show:false,
        error:''
    })

    const getCityForecast=useCallback(()=>{
        const locationKey=currentCityLocation.cityKey
        const url = forecastsUrl(locationKey,props.temType)
        axios.get(url)
        .then(res=>{
            console.log(res,'getCityForecast')
            setCurrentLocationForecast(res.data.DailyForecasts)
        })
        .catch(err=>{
            setShowErrorModal({
                show:true,
                error:'Failed to get data from server'
            })
        })
    },[props.temType,currentCityLocation.cityKey])



    const getCityWeatherAndForecast=useCallback((cityKey,newCityLocation)=>{
        getCityWeatherByKey(cityKey,newCityLocation)
        getCityForecast()
    },[getCityForecast])

    useEffect(()=>{
        getCityForecast()
    },[props.temType,getCityForecast])

    useEffect(()=>{

        let locationToQuery=currentCityLocation;
        getCityWeatherAndForecast(locationToQuery.cityKey)
        const newLocationIsFavorite=props.favorites.find(favoriteItem=>favoriteItem.cityKey===locationToQuery.cityKey);
        let res=false
        if(newLocationIsFavorite){
            res=true
        }
        setIsCurrentFavorite(res)
        
    },[currentCityLocation,props.favorites,getCityWeatherAndForecast])

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
            setShowErrorModal({
                show:true,
                error:'Failed to get data from server'
            })
        })
    }



    const autoCompleteChangeHandler=(event)=>{
        if(/^[A-Za-z]*$/.test(event.target.value)){
            setAutoCompleteText(event.target.value)
        }
        else{
            setShowErrorModal({
                show:true,
                error:'Input can contain only english letters'
            })
        }
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
    const dismissErrorModal=()=>{
        setShowErrorModal({
            show:false,
            error:''
        })
    }

    let homeStyle=[classes.HomeContainer,classes.HomeLightMode]
    if(props.mode){
        homeStyle=[classes.HomeContainer,classes.HomeDarkMode]
    }

    return(
        <div className={homeStyle.join(' ')}>
            <ErrorModal show={showErrorModal.show} error={showErrorModal.error} clicked={dismissErrorModal}/>
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
                temType={props.temType}
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