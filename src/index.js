import PubSub from 'pubsub-js';
import { format, add } from 'date-fns';
import { getWeatherData } from './api.js';
import { createCurrWeatherObj, createDailyWeatherObj, createHourlyWeatherObj } from './logic.js';
import { LAYOUT, CLEAR_DOM, CHANGE_UNITS, createCurrWeatherDomObj, createDailyWeatherDomObj, createHourlyWeatherDomObj } from './dom.js';
import './style.css';

export const EVENT_LISTENERS = 'add all event listeners to the page';

let city;

async function getAllWeatherInfo(){
    const weatherData = await getWeatherData(city);
    const currWeatherData = weatherData.currWeatherResponseBody;
    const dailyAndHourlyData = weatherData.dailyHourlyWeatherResponseBody;
    const hourObjArr = [];

    if(currWeatherData){
        const currWeather = createCurrWeatherObj(currWeatherData);
        const lastWeatherUpdate = currWeather.lastUpdatedDate;
        const nextHour = add(lastWeatherUpdate, { hours: 1 });
        const formattedHour = Number(format(nextHour, 'HH'));

        createCurrWeatherDomObj(currWeather);
        // console.log(currWeather);

        for(let dataInfoIndex = 0; dataInfoIndex <= 2; dataInfoIndex++){
            const dailyWeather = await createDailyWeatherObj(dailyAndHourlyData, dataInfoIndex);
            createDailyWeatherDomObj(dailyWeather);
            // console.log(dailyWeather);
        }

        outer: 
        for (let dayDataIndex = 0; dayDataIndex <= 1; dayDataIndex++){

            let hourDataIndex = dayDataIndex === 0 ? formattedHour : 0;

            for( ; hourDataIndex <= 23; hourDataIndex++){
                const hourlyWeather = await createHourlyWeatherObj(dailyAndHourlyData, dayDataIndex, hourDataIndex);

                if(hourObjArr.length == 24){
                    break outer;
                }

                hourObjArr.push(hourlyWeather);
                createHourlyWeatherDomObj(hourlyWeather);
                // console.log(hourlyWeather);
            }
        }
    }
}

function addAllEventListeners(){
    const searchBar = document.querySelector('#search');
    const unitBtn = document.querySelector('.unit-btn');

    searchBar.addEventListener('keydown', () => {
        if(event.key === 'Enter'){
            event.preventDefault();
            
            city = searchBar.value;
            getAllWeatherInfo();

            PubSub.publish(CLEAR_DOM);
        }
    });

    unitBtn.addEventListener('click', () => {
        PubSub.publish(CHANGE_UNITS);
    });
    
}

document.addEventListener('DOMContentLoaded', () => {
    PubSub.publish(LAYOUT);
});

PubSub.subscribe(EVENT_LISTENERS, addAllEventListeners);












