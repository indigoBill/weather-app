import { format, parseISO, isToday } from 'date-fns';

function getImagePath(conditionIcon){
    const image = require.context('./assets/', true, /\.png$/);

    // THE conditionIcon PATH IS FROM THE WEATHER API SO TO CONNECT THAT PATH TO THE PATH IN THE LOCAL ASSETS FOLDER THE ORIGINAL PATH NEEDS TO BE SLICED 
    // AFTER THE .com AND APPENDED TO THE PATH WITHIN THE LOCAL DIRECTORY
    const sliceStart = conditionIcon.indexOf('m') + 2;
    const pathToAdd = conditionIcon.slice(sliceStart);

    return image(`./${pathToAdd}`);
}

export function createCurrWeatherObj(dataObj){
    if(!dataObj) return;

    const locationName = dataObj.location.name;
    const date = format(dataObj.location.localtime, 'E, MMM. do, yyyy');
    const lastUpdatedDate = dataObj.current.last_updated;
    const lastUpdatedTime = format(dataObj.current.last_updated, 'p');
    const tempF = Math.round(dataObj.current.temp_f);
    const tempC = Math.round(dataObj.current.temp_c);
    const conditionText = dataObj.current.condition.text;
    const conditionIcon = getImagePath(dataObj.current.condition.icon);
    const windMph = Math.round(dataObj.current.wind_mph);
    const windKph = Math.round(dataObj.current.wind_kph);
    const precipInches = Math.round(dataObj.current.precip_in);
    const precipMm = Math.round(dataObj.current.precip_mm);
    const {humidity} = dataObj.current;
    const tempFeelF = Math.round(dataObj.current.feelslike_f);
    const tempFeelC = Math.round(dataObj.current.feelslike_c);
    
    return { locationName, date, lastUpdatedDate, lastUpdatedTime, tempF, tempC, conditionText, conditionIcon, windMph, windKph, precipInches, precipMm, humidity, tempFeelF, tempFeelC };
}

export function createDailyWeatherObj(dataObj, dayIncrementor){
    if(!dataObj) return;

    const parsedDate = parseISO(dataObj.forecast.forecastday[dayIncrementor].date);
    const conditionIcon = getImagePath(dataObj.forecast.forecastday[dayIncrementor].day.condition.icon);
    const maxTempF = Math.round(dataObj.forecast.forecastday[dayIncrementor].day.maxtemp_f);
    const maxTempC = Math.round(dataObj.forecast.forecastday[dayIncrementor].day.maxtemp_c);
    const minTempF = Math.round(dataObj.forecast.forecastday[dayIncrementor].day.mintemp_f);
    const minTempC = Math.round(dataObj.forecast.forecastday[dayIncrementor].day.mintemp_c);
    let dayOfWeek = format(parsedDate, 'cccc');

    if(isToday(parsedDate)){
        dayOfWeek = 'Today';
    }

    return { dayOfWeek, conditionIcon, maxTempF, maxTempC, minTempF, minTempC };
}

export function createHourlyWeatherObj(dataObj, dailyIncrementor, hourIncrementor){
    if(!dataObj) return;

    const hourOfDay = format(dataObj.forecast.forecastday[dailyIncrementor].hour[hourIncrementor].time, "ha");
    const conditionIcon = getImagePath(dataObj.forecast.forecastday[dailyIncrementor].hour[hourIncrementor].condition.icon);
    const tempF = Math.round(dataObj.forecast.forecastday[dailyIncrementor].hour[hourIncrementor].temp_f);
    const tempC = Math.round(dataObj.forecast.forecastday[dailyIncrementor].hour[hourIncrementor].temp_c);

    return { hourOfDay, conditionIcon, tempF, tempC };
}





