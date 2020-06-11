import React, { useState, useEffect,useCallback } from 'react'
import classes from './Favorites.module.css'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'
import axios from 'axios';
import { currentConditionsUrl } from '../../accuWeatherServices/generateUrl'
import FavoriteCard from './favoriteCard/FavoriteCard'
import ErrorModal from '../../UI/modal/ErrorModal'

const Favorites = props => {
    const [currFavorites, setCurrFavorites] = useState(null)
    const [showErrorModal,setShowErrorModal]=useState({
        show:false,
        error:''
    })

    const filterCurrFavorites = useCallback(() => {
        const userFavorites = props.favorites;
        const favoritesDataArr = []
        for (let currFavorite of currFavorites) {
            let found = userFavorites.find(userFavorite => userFavorite.cityKey === currFavorite.cityKey);
            if (found) favoritesDataArr.push(currFavorite);
        }
        setCurrFavorites(favoritesDataArr);
    },[currFavorites,props.favorites])

    const getAllFavorites = useCallback(() => {
        const userFavorites = props.favorites;
        const requestesArr = []
        for (let location of userFavorites) {
            let url = currentConditionsUrl(location.cityKey);
            requestesArr.push(axios.get(url));
        }

        axios.all(requestesArr).then(axios.spread((...responses) => {
            const favoritesDataArr = [];
            for (let index in responses) {
                responses[index].data[0] = {
                    ...responses[index].data[0],
                    ...props.favorites[index]
                }
                favoritesDataArr.push(responses[index].data[0])
            }
            setCurrFavorites(favoritesDataArr)
        }))
        .catch(err=>{
            setShowErrorModal({
                show:true,
               error:'Failed to get data from server'
           })
            
        })
    },[props.favorites])


    useEffect(() => {
        if (currFavorites === null) {
            getAllFavorites();
        }
        else if (currFavorites.length !== props.favorites.length) {
            filterCurrFavorites()
        }

    }, [currFavorites, props.favorites,filterCurrFavorites,getAllFavorites])


    const removeFromFavorites = (favoriteData) => {
        props.onRemoveFromFavorite(favoriteData.cityKey)
    }
    const dismissErrorModal=()=>{
        setShowErrorModal({
            show:false,
           error:''
       })
    }

    return (
        <div className={classes.Favorites}>
            <ErrorModal show={showErrorModal.show} error={showErrorModal.error} clicked={dismissErrorModal}/>
            {
                currFavorites && currFavorites.length !== 0 ?
                    currFavorites.map(favoriteData => {
                        return <FavoriteCard
                            {...props}
                            key={favoriteData.cityKey}
                            favoriteData={favoriteData}
                            temType={props.temType}
                            removeFromFavorites={() => { removeFromFavorites(favoriteData) }} />
                    })

                    : <div className={classes.NoDataMessage}>No favorite to display</div>
            }
        </div>
    )
}


const mapStateToProps = state => {
    return {
        temType: state.temType,
        mode: state.mode,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveFromFavorite: (cityKey) => dispatch({ type: actionTypes.REMOVE_LOCATION_FROM_FAVORITE, cityKey: cityKey })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites)

