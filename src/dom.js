import PubSub from 'pubsub-js';
import { EVENT_LISTENERS } from './barrel';

export const LAYOUT = 'load page elements';
export const CLEAR_DOM = 'remove any existing dom elements except the search bar';
export const CHANGE_UNITS = 'change the units that are being displayed';
const body = document.querySelector('body');

function createUserInputField(){
    const form = document.createElement('form');
    const inputContainer = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    label.textContent = 'SEARCH';

    label.setAttribute('for', 'search');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'search');
    input.setAttribute('id', 'search');
    
    form.appendChild(inputContainer);
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    body.appendChild(form);

    PubSub.publish(EVENT_LISTENERS);
}

function createUnitsToggleBtn(){
    const unitToggleBtn = document.createElement('button');

    unitToggleBtn.classList.add('unit-btn');

    unitToggleBtn.textContent = 'F/C';

    body.appendChild(unitToggleBtn);
}

export function createCurrWeatherDomObj(obj){
    const weatherInfoContainer = document.createElement('div');
    const locationName = document.createElement('p');
    const date = document.createElement('p');
    const lastUpdatedTime = document.createElement('p');
    const tempContainer = document.createElement('div');
    const tempF = document.createElement('p');
    const tempC = document.createElement('p');
    const conditionText = document.createElement('p');
    const conditionIcon = document.createElement('img');
    const windContainer = document.createElement('div');
    const windMph = document.createElement('p');
    const windKph = document.createElement('p');
    const precipContainer = document.createElement('div');
    const precipInches = document.createElement('p');
    const precipMm = document.createElement('p');
    const humidity = document.createElement('p');
    const tempFeelContainer = document.createElement('div');
    const tempFeelF = document.createElement('p');
    const tempFeelC = document.createElement('p');

    weatherInfoContainer.classList.add('weather-info');
    tempF.classList.add('units', 'us-units');
    windMph.classList.add('units', 'us-units');
    precipInches.classList.add('units', 'us-units');
    tempFeelF.classList.add('units', 'us-units');

    tempC.classList.add('units', 'metric-units', 'hide');
    windKph.classList.add('units', 'metric-units', 'hide');
    precipMm.classList.add('units', 'metric-units', 'hide');
    tempFeelC.classList.add('units', 'metric-units', 'hide');

    locationName.textContent = obj.locationName;
    date.textContent = obj.date;
    lastUpdatedTime.textContent = `LAST UPDATED: ${obj.lastUpdatedTime}`;
    tempF.textContent = `${obj.tempF}°F`;
    tempC.textContent = `${obj.tempC}°C`;
    conditionText.textContent = obj.conditionText;
    conditionIcon.setAttribute('src', obj.conditionIcon);
    windMph.textContent = `WIND: ${obj.windMph}MPH`;
    windKph.textContent = `WIND: ${obj.windKph}KPH`;
    precipInches.textContent = `PRECIP: ${obj.precipInches}IN`;
    precipMm.textContent = `PRECIP: ${obj.precipMm}MM`;
    humidity.textContent = `HUMIDITY: ${obj.humidity}%`;
    tempFeelF.textContent = `FEELS LIKE: ${obj.tempFeelF}°F`;
    tempFeelC.textContent = `FEELS LIKE: ${obj.tempFeelC}°C`;
    
    tempContainer.appendChild(tempF);
    tempContainer.appendChild(tempC);
    windContainer.appendChild(windMph);
    windContainer.appendChild(windKph);
    precipContainer.appendChild(precipInches);
    precipContainer.appendChild(precipMm);
    tempFeelContainer.appendChild(tempFeelF);
    tempFeelContainer.appendChild(tempFeelC);

    weatherInfoContainer.appendChild(locationName);
    weatherInfoContainer.appendChild(date);
    weatherInfoContainer.appendChild(lastUpdatedTime);
    weatherInfoContainer.appendChild(tempContainer);
    weatherInfoContainer.appendChild(conditionText);
    weatherInfoContainer.appendChild(conditionIcon);
    weatherInfoContainer.appendChild(windContainer);
    weatherInfoContainer.appendChild(precipContainer);
    weatherInfoContainer.appendChild(humidity);
    weatherInfoContainer.appendChild(tempFeelContainer);

    body.appendChild(weatherInfoContainer);
}

export function createDailyWeatherDomObj(obj){
    const dailyWeatherInfoContainer = document.createElement('div');
    const dayOfWeek = document.createElement('p');
    const conditionIcon = document.createElement('img');
    const maxTempContainer = document.createElement('div');
    const maxTempF = document.createElement('p');
    const maxTempC = document.createElement('p');
    const minTempContainer = document.createElement('div');
    const minTempF = document.createElement('p');
    const minTempC = document.createElement('p');

    dailyWeatherInfoContainer.classList.add('weather-info');
    maxTempF.classList.add('units', 'us-units');
    minTempF.classList.add('units', 'us-units');
    maxTempC.classList.add('units', 'metric-units', 'hide');
    minTempC.classList.add('units', 'metric-units', 'hide');

    dayOfWeek.textContent = obj.dayOfWeek;
    conditionIcon.setAttribute('src', obj.conditionIcon);
    maxTempF.textContent = `HIGH: ${obj.maxTempF}°F`;
    maxTempC.textContent = `HIGH: ${obj.maxTempC}°C`;
    minTempF.textContent = `LOW: ${obj.minTempF}°F`;
    minTempC.textContent = `LOW: ${obj.minTempC}°C`;

    maxTempContainer.appendChild(maxTempF);
    maxTempContainer.appendChild(maxTempC);
    minTempContainer.appendChild(minTempF);
    minTempContainer.appendChild(minTempC);

    dailyWeatherInfoContainer.appendChild(dayOfWeek);
    dailyWeatherInfoContainer.appendChild(conditionIcon);
    dailyWeatherInfoContainer.appendChild(maxTempContainer);
    dailyWeatherInfoContainer.appendChild(minTempContainer);

    body.appendChild(dailyWeatherInfoContainer);
}

export function createHourlyWeatherDomObj(obj){
    const hourlyWeatherInfoContainer = document.createElement('div');
    const hourOfDay = document.createElement('p');
    const conditionIcon = document.createElement('img');
    const tempContainer = document.createElement('div');
    const tempF = document.createElement('p');
    const tempC = document.createElement('p');

    hourlyWeatherInfoContainer.classList.add('weather-info');
    tempF.classList.add('units', 'us-units');
    tempC.classList.add('units', 'metric-units', 'hide');

    hourOfDay.textContent = obj.hourOfDay;
    conditionIcon.setAttribute('src', obj.conditionIcon);
    tempF.textContent = `${obj.tempF}°F`;
    tempC.textContent = `${obj.tempC}°C`;

    tempContainer.appendChild(tempF);
    tempContainer.appendChild(tempC);

    hourlyWeatherInfoContainer.appendChild(hourOfDay);
    hourlyWeatherInfoContainer.appendChild(conditionIcon);
    hourlyWeatherInfoContainer.appendChild(tempContainer);

    body.appendChild(hourlyWeatherInfoContainer);
}

// function createHourlyWeatherDomObjContainer(){
//     const hourlyWeatherContainer = document.createElement('div');

// }

function toggleUnitDisplay(){
    const unitsToHide = document.querySelectorAll('.units:not(.hide)');
    const unitsToShow = document.querySelectorAll('.hide');

    if(unitsToShow.length > 0){
        unitsToShow.forEach((unit) => {
            unit.classList.toggle('hide');
        });
    }

    unitsToHide.forEach((unit) => {
        unit.classList.toggle('hide');
    });
}

function clearDom(){
    if(document.body.hasChildNodes()){
        const bodyChildren = Array.from(document.body.children);

        bodyChildren.forEach((child) => {
            if(child.classList.contains('weather-info')){
                child.remove();
            }
        });
    }
}

PubSub.subscribe(LAYOUT, createUserInputField);
PubSub.subscribe(LAYOUT, createUnitsToggleBtn);
PubSub.subscribe(CHANGE_UNITS, toggleUnitDisplay);
PubSub.subscribe(CLEAR_DOM, clearDom);
