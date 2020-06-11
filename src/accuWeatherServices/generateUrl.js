const apiKey='ck1ZheSufWV065kPzObIVn9i9XziUAAr'

export const autoCompleteUrl=(locationQuery)=>{
    return `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${locationQuery}`
}

export const currentConditionsUrl=locationKey=>{
    return `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
}

export const forecastsUrl=(locationKey,temType)=>{
    let getCel=''
    if(temType){
        getCel=`&metric=true`
    }
    return `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`+getCel
}

export const getWeatherIcon=iconNum=>{
    if(iconNum<10){
        iconNum='0'+iconNum
    }

    return `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`
}

export const getLocationByGeoPosition=(lat,long)=>{
    return `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}`
}