import PubSub from 'pubsub-js';

export const DISPLAY_ERROR = 'display error message';
export const HIDE_ERROR = 'hide error message';

const API_KEY = '69b56b4aea6d430eb7a222431240303';

async function getDailyAndHourlyWeatherData(cityName){
    const httpResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3`, {mode: 'cors'});
    const responseBody = await httpResponse.json();

    return responseBody;
}

export async function getWeatherData(cityName) {
    try{
        const httpResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`, {mode: 'cors'});
        const currWeatherResponseBody = await httpResponse.json();

        if('error' in currWeatherResponseBody){
            throw new Error;
        }

        const dailyHourlyWeatherResponseBody = await getDailyAndHourlyWeatherData(cityName);

        PubSub.publish(HIDE_ERROR);

        return { currWeatherResponseBody, dailyHourlyWeatherResponseBody };
    }catch(err){
        err.message = 'UNABLE TO FIND WEATHER DATA FOR THAT LOCATION';
        console.log(err);

        PubSub.publish(DISPLAY_ERROR);

        return err;
    }
}