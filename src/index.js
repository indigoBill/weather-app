import PubSub from 'pubsub-js';
import { format, add } from 'date-fns';
import { getWeatherData } from './api';
import { createCurrWeatherObj, createDailyWeatherObj, createHourlyWeatherObj } from './logic';
import { LAYOUT, CLEAR_DOM, CHANGE_UNITS, EVENT_LISTENERS, LOADER, createCurrWeatherDomObj, createDailyWeatherDomObj, createHourlyWeatherDomObj, createHourlyGroup, addHourlyWeatherToGroup, createDailyGroup, addDailyWeatherToGroup, createHourlyGroupContainer } from './dom';
import './style.css';

let location = 'new york';

async function getAllWeatherInfo(){
    const weatherData = await getWeatherData(location);
    const currWeatherData = weatherData.currWeatherResponseBody;
    const dailyAndHourlyData = weatherData.dailyHourlyWeatherResponseBody;
    const hourObjArr = [];

    if(currWeatherData){
        const currWeather = createCurrWeatherObj(currWeatherData);
        const lastWeatherUpdate = currWeather.lastUpdatedDate;
        const nextHour = add(lastWeatherUpdate, { hours: 1 });
        const formattedHour = Number(format(nextHour, 'HH'));
        let hourlyGroupNum = 0;

        createCurrWeatherDomObj(currWeather);

        createDailyGroup();

        for(let dataInfoIndex = 0; dataInfoIndex <= 2; dataInfoIndex+=1){
            const dailyWeather = createDailyWeatherObj(dailyAndHourlyData, dataInfoIndex);
            addDailyWeatherToGroup(createDailyWeatherDomObj(dailyWeather));
        }

        createHourlyGroupContainer();

        for (let dayDataIndex = 0; dayDataIndex <= 1; dayDataIndex+=1){

            let hourDataIndex = dayDataIndex === 0 ? formattedHour : 0;

            for( ; hourDataIndex <= 23; hourDataIndex += 1){
                const hourlyWeather = createHourlyWeatherObj(dailyAndHourlyData, dayDataIndex, hourDataIndex);

                if(hourObjArr.length === 24){
                    break;
                }

                if(hourObjArr.length % 8 === 0){
                    hourlyGroupNum+=1;
                    createHourlyGroup(hourlyGroupNum);
                }

                hourObjArr.push(hourlyWeather);

                addHourlyWeatherToGroup(hourlyGroupNum, createHourlyWeatherDomObj(hourlyWeather));
            }
        }

        return true;
    }
    
    return false;
}

async function checkForValidEntry(event){
    const searchBar = event.target;
    let displayResults;

    if(event.key === 'Enter'){    
        event.preventDefault();
    
        location = searchBar.value;
        displayResults = await getAllWeatherInfo();

        if(displayResults){
            PubSub.publish(CLEAR_DOM);
            PubSub.publish(LOADER);
            await getAllWeatherInfo();
            PubSub.publish(LOADER);
        }
    }
}

function addHeaderEventListeners(){
    const searchBar = document.querySelector('#search');
    const unitBtn = document.querySelector('.unit-btn');

    searchBar.addEventListener('keydown', checkForValidEntry);

    unitBtn.addEventListener('click', () => {
        PubSub.publish(CHANGE_UNITS);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    PubSub.publish(LAYOUT);
    PubSub.publish(LOADER);
    await getAllWeatherInfo();
    PubSub.publish(LOADER);
});

PubSub.subscribe(EVENT_LISTENERS, addHeaderEventListeners);
