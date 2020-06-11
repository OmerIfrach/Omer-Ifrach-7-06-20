import * as actionTypes from './actions'
let userPref=localStorage.getItem('userPrefrence')

if(!userPref){
    userPref={
        temType:false,
        mode:false,
        favorites:[]
    }
    localStorage.setItem('userPrefrence',JSON.stringify(userPref))
}
else{
    userPref=JSON.parse(userPref)
}



const initState={
    ...userPref
}

const reducer=(state=initState,action)=>{
    let newState;
    let newFavorites;
    switch(action.type){
        case actionTypes.TOGGLE_TEMPERTURE_TYPE:
            newState={
                ...state,
                temType:!state.temType
            }
            localStorage.setItem('userPrefrence',JSON.stringify(newState))

            return newState;
        case actionTypes.TOGGLE_MODE: 
            newState={
                ...state,
                mode:!state.mode
            }
            localStorage.setItem('userPrefrence',JSON.stringify(newState))

            return newState;
        case actionTypes.ADD_LOCATION_TO_FAVORITE:
            newFavorites=state.favorites.concat(action.favoriteItem);
            newState={
                ...state,
                favorites:newFavorites
            }
            localStorage.setItem('userPrefrence',JSON.stringify(newState))
            return newState;
        case actionTypes.REMOVE_LOCATION_FROM_FAVORITE:   
            newFavorites=state.favorites.filter(favoriteItem=>favoriteItem.cityKey!==action.cityKey);
            newState={
                ...state,
                favorites:newFavorites
            }
            localStorage.setItem('userPrefrence',JSON.stringify(newState));
            return newState;
        default:
            return state;    
    }

}

export default reducer;