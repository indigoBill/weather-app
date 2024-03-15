import PubSub from 'pubsub-js';

import { DISPLAY_ERROR, HIDE_ERROR } from './api';

export const LAYOUT = 'load page elements';
export const CLEAR_DOM = 'remove any existing dom elements except the search bar';
export const CHANGE_UNITS = 'change the units that are being displayed';
export const EVENT_LISTENERS = 'add all event listeners to the page';
export const LOADER = 'toggle loader display';

const body = document.querySelector('body');

function createPageLogo(){
    const logoContainer = document.createElement('div');
    const logoName = document.createElement('p');
    const svgIconContainer = document.createElement('div');
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    logoContainer.classList.add('logo-container');
    logoName.classList.add('logo-name');
    svgIconContainer.classList.add('svg-icon-container');

    logoName.textContent = 'WeatherGo';
    svgIcon.setAttribute('viewBox', '0 0 24 24');
    path.setAttribute('d', "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z");

    svgIcon.appendChild(path);
    svgIconContainer.appendChild(svgIcon);
    logoContainer.appendChild(logoName);
    logoContainer.appendChild(svgIconContainer);

    return logoContainer;
}
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
    const unitBtnContainer = document.createElement('div');
    const unitToggleBtn = document.createElement('button');

    unitBtnContainer.classList.add('unit-btn-container');
    unitToggleBtn.classList.add('unit-btn');

    unitToggleBtn.textContent = '°F / °C';
    unitBtnContainer.appendChild(unitToggleBtn);

    return unitBtnContainer;
}

function createHeader(){
    const header = document.createElement('header');

    header.appendChild(createPageLogo());
    header.appendChild(createUserInputField());
    header.appendChild(createUnitsToggleBtn());

    body.appendChild(header);
}

function changeToNextHourGroup(event){
    const visibleSlide = document.querySelector('.hour-group:not(.hide)');
    const allCircleBtns = document.querySelectorAll('.hour-btn');

    visibleSlide.classList.add('hide');

    if(event.target.classList.contains('right-btn')){
        if(visibleSlide.nextSibling !== null){
            const hourGroupName = visibleSlide.nextSibling.classList[0];

            visibleSlide.nextSibling.classList.remove('hide');

            allCircleBtns.forEach((circleBtn) => {
                if(circleBtn.classList.contains(hourGroupName)){
                    circleBtn.classList.add('selected-btn');
                }else{
                    circleBtn.classList.remove('selected-btn');
                }
            });
        }else{
            const firstSlide = document.querySelector('.hour-group-1.hour-group');
    
            firstSlide.classList.remove('hide');

            allCircleBtns.forEach((circleBtn) => {
                if(circleBtn.classList.contains('hour-group-1')){
                    circleBtn.classList.add('selected-btn');
                }else{
                    circleBtn.classList.remove('selected-btn');
                }
            });
        }
    }else if(event.target.classList.contains('left-btn')){
        const firstSlide = document.querySelector('.hour-group-1.hour-group');

        if(visibleSlide !== firstSlide){
            const hourGroupName = visibleSlide.previousSibling.classList[0];

            visibleSlide.previousSibling.classList.remove('hide');

            allCircleBtns.forEach((circleBtn) => {
                if(circleBtn.classList.contains(hourGroupName)){
                    circleBtn.classList.add('selected-btn');
                }else{
                    circleBtn.classList.remove('selected-btn');
                }
            });
        }else{
            const lastSlide = document.querySelector('.hour-group-3.hour-group');

            lastSlide.classList.remove('hide');

            allCircleBtns.forEach((circleBtn) => {
                if(circleBtn.classList.contains('hour-group-3')){
                    circleBtn.classList.add('selected-btn');
                }else{
                    circleBtn.classList.remove('selected-btn');
                }
            });
        }
    }
}

function selectHourGroup(event){
    const selectedBtn = event.target;
    const allBtns = document.querySelectorAll('.hour-btn');
    const allGroups = document.querySelectorAll('.hour-group');

    allBtns.forEach((btn) => {
        if(btn !== selectedBtn){
            btn.classList.remove('selected-btn');
        }else{
            btn.classList.add('selected-btn');
        }
    });

    if(selectedBtn.classList.contains('hour-group-1')){
        allGroups.forEach((group) => {
            if(group.classList.contains('hour-group-1')){
                group.classList.remove('hide');
            }else{
                group.classList.add('hide');
            }
        });
    }else if(selectedBtn.classList.contains('hour-group-2')){
        allGroups.forEach((group) => {
            if(group.classList.contains('hour-group-2')){
                group.classList.remove('hide');
            }else{
                group.classList.add('hide');
            }
        });
    }else{
        allGroups.forEach((group) => {
            if(group.classList.contains('hour-group-3')){
                group.classList.remove('hide');
            }else{
                group.classList.add('hide');
            }
        });
    }
}

function addHourlyGroupBtnEventListeners(){
    const slideDirectionBtns = document.querySelectorAll('.hour-direction-btn');
    const slideBtns = document.querySelectorAll('.hour-btn');

    slideDirectionBtns.forEach((directionBtn) => {
        directionBtn.addEventListener('click', changeToNextHourGroup);
    });

    slideBtns.forEach((slideBtn) => {
        slideBtn.addEventListener('click', selectHourGroup);
    });
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
    const dailyTempContainer = document.createElement('div');
    const maxTempContainer = document.createElement('div');
    const maxTempF = document.createElement('p');
    const maxTempC = document.createElement('p');
    const minTempContainer = document.createElement('div');
    const minTempF = document.createElement('p');
    const minTempC = document.createElement('p');

    dailyWeatherInfoContainer.classList.add('daily-weather');
    dailyWeatherInfoContainer.classList.add('weather-info');
    dailyTempContainer.classList.add('daily-temp-container');
    maxTempContainer.classList.add('max-temp-container');
    minTempContainer.classList.add('min-temp-container');

    maxTempF.classList.add('units', 'us-units');
    minTempF.classList.add('units', 'us-units');
    maxTempC.classList.add('units', 'metric-units', 'hide');
    minTempC.classList.add('units', 'metric-units', 'hide');

    dayOfWeek.textContent = obj.dayOfWeek;
    conditionIcon.setAttribute('src', obj.conditionIcon);
    maxTempF.textContent = `${obj.maxTempF}°F`;
    maxTempC.textContent = `${obj.maxTempC}°C`;
    minTempF.textContent = `${obj.minTempF}°F`;
    minTempC.textContent = `${obj.minTempC}°C`;

    dailyTempContainer.appendChild(maxTempContainer);
    dailyTempContainer.appendChild(minTempContainer);

    maxTempContainer.appendChild(maxTempF);
    maxTempContainer.appendChild(maxTempC);
    minTempContainer.appendChild(minTempF);
    minTempContainer.appendChild(minTempC);

    dailyWeatherInfoContainer.appendChild(dayOfWeek);
    dailyWeatherInfoContainer.appendChild(conditionIcon);
    dailyWeatherInfoContainer.appendChild(dailyTempContainer);

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
    const nameContainer = document.createElement('div');
    const groupName = document.createElement('h3');

    groupName.textContent = '3-Day Forecast';

    dailyGroup.classList.add('daily-group');
    dailyGroup.classList.add('weather-info');
    nameContainer.classList.add('daily-name-container');
    
    nameContainer.appendChild(groupName);
    dailyGroup.appendChild(nameContainer);
    body.appendChild(dailyGroup);
}

export function addDailyWeatherToGroup(domObj){
    const dailyGroup = document.querySelector('.daily-group');

    dailyGroup.appendChild(domObj);
}

export function createHourlyGroupContainer(){
    const groupContainer = document.createElement('div');
    const nameContainer = document.createElement('div');
    const groupName = document.createElement('h3');
    const btnContainer = document.createElement('div');
    const leftBtn = document.createElement('button');
    const grpBtn1 = document.createElement('button');
    const grpBtn2 = document.createElement('button');
    const grpBtn3 = document.createElement('button');
    const rightBtn = document.createElement('button');

    btnContainer.classList.add('hour-btns-container');
    leftBtn.classList.add('hour-direction-btn', 'left-btn');
    rightBtn.classList.add('hour-direction-btn', 'right-btn');
    grpBtn1.classList.add('hour-btn', 'hour-group-1', 'selected-btn');
    grpBtn2.classList.add('hour-btn', 'hour-group-2');
    grpBtn3.classList.add('hour-btn', 'hour-group-3');
    nameContainer.classList.add('hourly-name-container');
    groupContainer.classList.add('hourly-group-container');
    groupContainer.classList.add('weather-info');

    groupName.textContent = 'Hourly Forecast';

    btnContainer.appendChild(leftBtn);
    btnContainer.appendChild(grpBtn1);
    btnContainer.appendChild(grpBtn2);
    btnContainer.appendChild(grpBtn3);
    btnContainer.appendChild(rightBtn);
    nameContainer.appendChild(groupName);
    groupContainer.appendChild(nameContainer);
    groupContainer.appendChild(btnContainer);
    body.appendChild(groupContainer);

    addHourlyGroupBtnEventListeners();
}

export function createHourlyGroup(groupNum){
    const hourlyWeatherGrouping = document.createElement('div');
    const parent = document.querySelector('.hourly-group-container');

    hourlyWeatherGrouping.classList.add(`hour-group-${groupNum}`);
    hourlyWeatherGrouping.classList.add('hour-group');

    parent.appendChild(hourlyWeatherGrouping);
}

export function addHourlyWeatherToGroup(groupNum, domObj){
    const hourlyGroup = document.querySelector(`.hour-group-${groupNum}.hour-group`);
    const firstGroupNum = 1;

    if(groupNum !== firstGroupNum){
        hourlyGroup.classList.add('hide');
    }

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
    if(body.hasChildNodes()){
        const bodyChildren = Array.from(body.children);

        bodyChildren.forEach((child) => {
            if(child.classList.contains('weather-info')){
                child.remove();
            }
        });
    }
}

function createErrorMessage(){
    const errorMessageContainer = document.createElement('div');
    const errorMessageBkgd = document.createElement('div');
    const errorMessage = document.createElement('p');

    errorMessage.textContent = 'ENTER A VALID U.S. ZIPCODE, U.K. POSTCODE, CANADA POSTALCODE OR CITY NAME';
    
    errorMessageContainer.classList.add('error');
    errorMessageBkgd.classList.add('error-bkgd');

    errorMessageBkgd.appendChild(errorMessage);
    errorMessageContainer.appendChild(errorMessageBkgd);
    body.appendChild(errorMessageContainer);
}

function displayErrorMessageDisplay(){
    const errorMessage = document.querySelector('.error-bkgd');

    errorMessage.classList.add('error-show');
}

function hideErrorMessageDisplay(){
    const errorMessage = document.querySelector('.error-bkgd');

    errorMessage.classList.remove('error-show');
}

function toggleLoaderDisplay(){
    const numOfLoadedElements = 2;
    const loader = document.createElement('div');

    loader.classList.add('loader');

    if(body.children.length === numOfLoadedElements){
        body.appendChild(loader);
    }else{
        // document.querySelector('.loader').remove();
        console.log('placeholder');
    }
}

PubSub.subscribe(DISPLAY_ERROR, displayErrorMessageDisplay);
PubSub.subscribe(HIDE_ERROR, hideErrorMessageDisplay);
PubSub.subscribe(LAYOUT, createHeader);
PubSub.subscribe(LAYOUT, createErrorMessage);
PubSub.subscribe(CHANGE_UNITS, toggleUnitDisplay);
PubSub.subscribe(CLEAR_DOM, clearDom);
// PubSub.subscribe(LOADER, toggleLoaderDisplay);
