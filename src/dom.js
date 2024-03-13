import PubSub from 'pubsub-js';

import { DISPLAY_ERROR, HIDE_ERROR } from './api';

export const LAYOUT = 'load page elements';
export const CLEAR_DOM = 'remove any existing dom elements except the search bar';
export const CHANGE_UNITS = 'change the units that are being displayed';
export const EVENT_LISTENERS = 'add all event listeners to the page';

const body = document.querySelector('body');

function createUserInputField(){
    const form = document.createElement('form');
    const inputContainer = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    label.textContent = 'SEARCH:';

    label.setAttribute('for', 'search');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'search');
    input.setAttribute('id', 'search');
    input.setAttribute('placeholder', 'ENTER ZIPCODE OR CITY');
    
    form.appendChild(inputContainer);
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);

    PubSub.publish(EVENT_LISTENERS);

    return form;
}

function createUnitsToggleBtn(){
    const unitToggleBtn = document.createElement('button');

    unitToggleBtn.classList.add('unit-btn');
    unitToggleBtn.textContent = '°F / °C';

    return unitToggleBtn
}

function createHeader(){
    const header = document.createElement('header');

    header.appendChild(createUserInputField());
    header.appendChild(createUnitsToggleBtn());

    body.appendChild(header);
}

export function createCurrWeatherDomObj(obj){
    const weatherInfoContainer = document.createElement('div');
    const leftContainer = document.createElement('div');
    const rightContainer = document.createElement('div');
    const tempAndIconContainer = document.createElement('div');
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

    weatherInfoContainer.classList.add('curr-weather');
    weatherInfoContainer.classList.add('weather-info');
    tempContainer.classList.add('temp-container');
    windContainer.classList.add('wind-container');
    precipContainer.classList.add('precip-container');
    tempFeelContainer.classList.add('temp-feel-container');
    tempAndIconContainer.classList.add('temp-icon-container');

    locationName.classList.add('curr-location');
    conditionText.classList.add('curr-condition-text');

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
    lastUpdatedTime.textContent = `Last Updated: ${obj.lastUpdatedTime}`;
    tempF.textContent = `${obj.tempF}°F`;
    tempC.textContent = `${obj.tempC}°C`;
    conditionText.textContent = obj.conditionText;
    conditionIcon.setAttribute('src', obj.conditionIcon);
    windMph.textContent = `Wind: ${obj.windMph}mph`;
    windKph.textContent = `Wind: ${obj.windKph}kph`;
    precipInches.textContent = `Precipitation: ${obj.precipInches}in`;
    precipMm.textContent = `Precipitation: ${obj.precipMm}mm`;
    humidity.textContent = `Humidity: ${obj.humidity}%`;
    tempFeelF.textContent = `Feels Like: ${obj.tempFeelF}°F`;
    tempFeelC.textContent = `Feels Like: ${obj.tempFeelC}°C`;
    
    tempContainer.appendChild(tempF);
    tempContainer.appendChild(tempC);
    windContainer.appendChild(windMph);
    windContainer.appendChild(windKph);
    precipContainer.appendChild(precipInches);
    precipContainer.appendChild(precipMm);
    tempFeelContainer.appendChild(tempFeelF);
    tempFeelContainer.appendChild(tempFeelC);

    leftContainer.appendChild(conditionText);
    leftContainer.appendChild(locationName);
    leftContainer.appendChild(date);
    leftContainer.appendChild(tempAndIconContainer);
    leftContainer.appendChild(lastUpdatedTime);

    tempAndIconContainer.appendChild(tempContainer);
    tempAndIconContainer.appendChild(conditionIcon);

    rightContainer.appendChild(windContainer);
    rightContainer.appendChild(precipContainer);
    rightContainer.appendChild(humidity);
    rightContainer.appendChild(tempFeelContainer);

    weatherInfoContainer.appendChild(leftContainer);
    weatherInfoContainer.appendChild(rightContainer);

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

    dailyWeatherInfoContainer.classList.add('daily-weather');
    dailyWeatherInfoContainer.classList.add('weather-info');
    maxTempContainer.classList.add('max-temp-container');
    minTempContainer.classList.add('min-temp-container');

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

    // body.appendChild(dailyWeatherInfoContainer);
    return dailyWeatherInfoContainer;
}

export function createHourlyWeatherDomObj(obj){
    const hourlyWeatherInfoContainer = document.createElement('div');
    const hourOfDay = document.createElement('p');
    const conditionIcon = document.createElement('img');
    const tempContainer = document.createElement('div');
    const tempF = document.createElement('p');
    const tempC = document.createElement('p');

    hourlyWeatherInfoContainer.classList.add('hourly-weather');
    tempContainer.classList.add('hourly-temp-container');
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

    return hourlyWeatherInfoContainer;
}

export function createDailyGroup(){
    const dailyGroup = document.createElement('div');

    dailyGroup.classList.add('daily-group');
    dailyGroup.classList.add('weather-info');

    body.appendChild(dailyGroup);
}

export function addDailyWeatherToGroup(domObj){
    const dailyGroup = document.querySelector('.daily-group');

    dailyGroup.appendChild(domObj);
}

export function createHourlyGroup(groupNum){
    const hourlyWeatherGrouping = document.createElement('div');

    hourlyWeatherGrouping.classList.add(`hour-group-${groupNum}`);
    hourlyWeatherGrouping.classList.add('hour-group');
    hourlyWeatherGrouping.classList.add('weather-info');

    body.appendChild(hourlyWeatherGrouping);
}

export function addHourlyWeatherToGroup(groupNum, domObj){
    const hourlyGroup = document.querySelector(`.hour-group-${groupNum}`);

    hourlyGroup.appendChild(domObj);
}

function toggleUnitDisplay(){
    const unitsToHide = document.querySelectorAll('.units:not(.hide)');
    const unitsToShow = document.querySelectorAll('.units.hide');

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

function createErrorMessage(){
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'ERROR';

    errorMessage.classList.add('error');
    errorMessage.classList.add('hide');

    body.appendChild(errorMessage);
}

function displayErrorMessageDisplay(){
    const errorMessage = document.querySelector('.error');

    errorMessage.classList.remove('hide');
}

function hideErrorMessageDisplay(){
    const errorMessage = document.querySelector('.error');

    errorMessage.classList.add('hide');
}

PubSub.subscribe(DISPLAY_ERROR, displayErrorMessageDisplay);
PubSub.subscribe(HIDE_ERROR, hideErrorMessageDisplay);


PubSub.subscribe(LAYOUT, createHeader);
PubSub.subscribe(LAYOUT, createErrorMessage);
PubSub.subscribe(CHANGE_UNITS, toggleUnitDisplay);
PubSub.subscribe(CLEAR_DOM, clearDom);
