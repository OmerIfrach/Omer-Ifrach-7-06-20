const apiKey='itP0PkNaAxpYPrlcVvCDVnuWnsRAAJ4K'

export const autoCompleteUrl=(locationQuery)=>{
    return `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${locationQuery}`
}

export const currentConditionsUrl=locationKey=>{
    return `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
}