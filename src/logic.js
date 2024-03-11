import { format, parseISO, isToday } from 'date-fns';

export function createCurrWeatherObj(dataObj){
    if(!dataObj) return;

    const locationName = dataObj.location.name;
    const date = format(dataObj.location.localtime, 'E, MMM. do, yyyy');
    const lastUpdatedDate = dataObj.current.last_updated;
    const lastUpdatedTime = format(dataObj.current.last_updated, 'p');
    const tempF = dataObj.current.temp_f;
    const tempC = dataObj.current.temp_c;
    const conditionText = dataObj.current.condition.text;
    const conditionIcon = dataObj.current.condition.icon;
    const windMph = dataObj.current.wind_mph;
    const windKph = dataObj.current.wind_kph;
    const precipInches = dataObj.current.precip_in;
    const precipMm = dataObj.current.precip_mm;
    const humidity = dataObj.current.humidity;
    const tempFeelF = dataObj.current.feelslike_f;
    const tempFeelC = dataObj.current.feelslike_c;
    
    return { locationName, date, lastUpdatedDate, lastUpdatedTime, tempF, tempC, conditionText, conditionIcon, windMph, windKph, precipInches, precipMm, humidity, tempFeelF, tempFeelC };
}

export function createDailyWeatherObj(dataObj, dayIncrementor){
    if(!dataObj) return;

    const parsedDate = parseISO(dataObj.forecast.forecastday[dayIncrementor].date);
    const conditionIcon = dataObj.forecast.forecastday[dayIncrementor].day.condition.icon;
    const maxTempF = dataObj.forecast.forecastday[dayIncrementor].day.maxtemp_f;
    const maxTempC = dataObj.forecast.forecastday[dayIncrementor].day.maxtemp_c;
    const minTempF = dataObj.forecast.forecastday[dayIncrementor].day.mintemp_f;
    const minTempC = dataObj.forecast.forecastday[dayIncrementor].day.mintemp_c;
    let dayOfWeek = format(parsedDate, 'cccc');

    if(isToday(parsedDate)){
        dayOfWeek = 'Today';
    }

    return { dayOfWeek, conditionIcon, maxTempF, maxTempC, minTempF, minTempC };
}

export function createHourlyWeatherObj(dataObj, dailyIncrementor, hourIncrementor){
    if(!dataObj) return;

    const hourOfDay = format(dataObj.forecast.forecastday[dailyIncrementor].hour[hourIncrementor].time, "ha");
    const conditionIcon = dataObj.forecast.forecastday[dailyIncrementor].hour[hourIncrementor].condition.icon;
    const tempF = dataObj.forecast.forecastday[dailyIncrementor].hour[hourIncrementor].temp_f;
    const tempC = dataObj.forecast.forecastday[dailyIncrementor].hour[hourIncrementor].temp_c;

    return { hourOfDay, conditionIcon, tempF, tempC };
}





