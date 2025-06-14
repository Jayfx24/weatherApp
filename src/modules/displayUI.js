import {
    format,
    parseISO,
} from 'date-fns';
import {
    selector,
    createElement,
    append,
    svgParser,
    getBgImage,
    getSvgIcon,
    friendlyDate,
    formattedHour,
    
   
} from './utility';

import { getActiveDate } from './indexTracker';
import { iconsSvg } from './icons';

import { dataManager } from './dataManager';
// Create form,

export const components = {
    form: createElement('form'),
    input: createElement('input', '', '', 'location'),
    inputWrapper: createElement('div', 'input-wrapper'),
    btn: createElement('button', '', 'Check Location'),
    spanError: createElement('span', 'error', '', 'locError'),
    inputSvg: createElement('button', 'input-svg'),
    changeTemp: createElement('div', 'change-temp'),
};

export const elements = {
    container: selector('.container'),
    header: selector('header'),
    formDiv: selector('.form'),
    currentInfo: selector('.current-info'),
    hourly: selector('.hourly'),
    sidebar: selector('.sidebar'),
    otherInfo: selector('.other-info'),
    slideNav: selector('slide-nav'),
    navPeriod: selector('.nav-period'),
    sideHeader: selector('.side-header'),
};

components.inputSvg.innerHTML = iconsSvg.search;
components.inputSvg.type = 'submit';
components.input.setAttribute('name', 'location');
components.input.setAttribute('placeholder', 'Search location');

export function renderUi() {
    const activeDate = getActiveDate();
    const data = dataManager.getData();
    const currentIcon = data.getDayIconDesc(activeDate);
    getBgImage(currentIcon).then((imgUrl) => {
        document.body.style.backgroundImage = `url(${imgUrl})`;
    });
    append(components.inputWrapper, components.inputSvg);
    append(components.inputWrapper, components.input);
    append(components.form, components.inputWrapper);
    append(components.form, components.spanError);
    append(elements.formDiv, components.form);

    renderDayInfo();
    renderHourly();
    otherWeatherEle();
    renderCurrentWeek();
}

export function renderDayInfo() {
    elements.currentInfo.innerHTML = '';
    const activeDate = getActiveDate();
    const data = dataManager.getData();
    const currentIcon = data.getDayIconDesc(activeDate);
    const currentWeatherSvg = createElement('div', 'curr-weather-svg');
    const currentWeatherTexts = createElement('div', 'current-weather-txt');
    const currentCondition = createElement(
        'p',
        'curr-desc',
        `${data.getDayCondition(activeDate)}`,
    );

    const date = parseISO(data.getDayDate(activeDate));
    const currDate = createElement(
        'p',
        'curr-date',
        `${format(date, 'EEE, MMM dd yyyy')}`,
    );
    // console.log(data.getDayDate(activeDate));
    const currentTemp = createElement(
        'h2',
        'curr-temp',
        `${data.getDayTemp(activeDate)}`,
    );

    const currLocation = createElement(
        'h2',
        'curr-loc',
        `${data.fullLocation}`,
    );

    

    currentWeatherSvg.innerHTML = getSvgIcon(currentIcon);
    append(elements.currentInfo, currentWeatherSvg);
    append(elements.currentInfo, currentWeatherTexts);
    append(currentWeatherTexts, currLocation);
    append(currentWeatherTexts, currDate);
    append(currentWeatherTexts, currentTemp);
    append(currentWeatherTexts, currentCondition);
   
}
// i need an activeDate count for this

export function renderHourly() {
    elements.hourly.innerHTML = '';
    const activeDate = getActiveDate();

    const data = dataManager.getData();
    const hours = data.getDayHours(activeDate);
    // console.log(hours);
    hours.forEach((element) => {
        const currTimeEpoch = Math.floor(Date.now() / 1000);
        const timeEpoch = element.datetimeEpoch + 3600;
        if (currTimeEpoch > timeEpoch) return;

        const box = createElement('div', 'hourly-card');
        const heading = createElement('div', 'hourly-heading');
        const time = createElement('h3', 'hourly-time');
        const svgBox = createElement('div', 'hourly-svg');
        const temp = createElement('p', 'hourly-temp');
        const feels = createElement('p', 'hourly-feels');
        const condition = createElement('p', 'hourly-condition');
        const precip = createElement('p', 'hourly-precip');

        const hourIndex = hours.indexOf(element);
        const hour = data.getHourDatetime(activeDate, hourIndex);

        const datetime = new Date(`${activeDate}T${hour}`);

        svgBox.innerHTML = getSvgIcon(element.icon);
        temp.textContent = data.getHourTemp(activeDate, hourIndex);
        feels.textContent = `Feels like ${data.getHourFeels(activeDate, hourIndex)}`;
        
        condition.textContent = element.conditions;
        time.textContent = formattedHour(
            element.datetimeEpoch * 1000,
            datetime,
        );
        precip.textContent = `${Math.round(element.precipprob)}% chance of rain`;

        time.classList.add('hour-item');
        box.setAttribute('data-weather',element.icon);
        svgBox.classList.add('hour-item');
        temp.classList.add('hour-item');
        feels.classList.add('hour-item');
        condition.classList.add('hour-item');
        precip.classList.add('hour-item');

        append(box, time);
        append(box, svgBox);
        append(box, temp);
        append(box, condition);
        append(box, feels);
        append(box, precip);

        append(elements.hourly, box);
    });

}

function renderCurrentWeek() {
    elements.navPeriod.innerHTML = '';

    const data = dataManager.getData();
    const comingDays = data.getNext5Days();

    comingDays.forEach((element) => {
        const button = createElement('button', 'nav-item');

        const icon = svgParser(getSvgIcon(element.icon));
        const date = parseISO(element.datetime);

        const buttonDate = createElement('h3', '', `${friendlyDate(date)}`);
        button.setAttribute('aria-label', element.description || 'Day item');
        button.setAttribute('data-date', element.datetime);

        if (button.getAttribute('data-date') === getActiveDate()) {
            button.classList.add('active');
        }
        append(button, icon);
        append(button, buttonDate);
        append(elements.navPeriod, button);
       
    });
}


// reminder: if icon type not found use loading icon


// CHANGE FROM INDEX TO DATE


function otherWeatherEle() {
    elements.otherInfo.innerHTML = '';
    const date = getActiveDate();

    const data = dataManager.getData();

    const precipitation = createElement('div', 'other-item');
    const precipitationSvg = createElement('div', 'per-svg');
    const precipitationText = createElement('p', 'item-value');
    const precipitationDescText = createElement(
        'p',
        'item-name',
        'Precip.',
    );

    const uvIndex = createElement('div', 'other-item');
    const uvIndexSvg = createElement('div', 'uv-svg');
    const uvIndexText = createElement('p', 'item-value');
    const uvIndexDescText = createElement('p', 'item-name', 'uv index');

    const sunrise = createElement('div', 'other-item');
    const sunriseSvg = createElement('div', 'sunrise-svg');
    const sunriseText = createElement('p', 'item-value');
    const sunriseDescText = createElement('p', 'item-name', 'sunrise');

    const sunset = createElement('div', 'other-item');
    const sunsetSvg = createElement('div', 'sunset-svg');
    const sunsetText = createElement('p', 'item-value');
    const sunsetDescText = createElement('p', 'item-name', 'sunset');

    const humidity = createElement('div', 'other-item');
    const humiditySvg = createElement('div', 'humidity-svg');
    const humidityText = createElement('p', 'item-value');
    const humidityDescText = createElement('p', 'item-name', 'humidity');

    const windSpeed = createElement('div', 'other-item');
    const windSpeedSvg = createElement('div', 'wind-svg');
    const windSpeedText = createElement('p', 'item-value');
    const windSpeedDescText = createElement('p', 'item-name', 'wind');

    precipitationSvg.innerHTML = iconsSvg.precip;
    precipitationText.textContent = `${data.getDayPrecip(date)}%`;

    uvIndexSvg.innerHTML = iconsSvg.uvIndex;
    uvIndexText.textContent = `${data.getDayUV(date)}`;

    sunriseSvg.innerHTML = iconsSvg.sunrise;
    sunriseText.textContent = `${data.getDaySunrise(date)}`;

    sunsetSvg.innerHTML = iconsSvg.sunset;
    sunsetText.textContent = `${data.getDaySunset(date)}`;

    humiditySvg.innerHTML = iconsSvg.humidity;
    humidityText.textContent = `${data.getDayHumidity(date)}`;

    windSpeedSvg.innerHTML = iconsSvg.wind;
    windSpeedText.textContent = `${data.getDayWindSpeed(date).toFixed(1)} km/h`;

    append(precipitation, precipitationDescText);
    append(precipitation, precipitationSvg);
    append(precipitation, precipitationText);

    append(humidity, humidityDescText);
    append(humidity, humiditySvg);
    append(humidity, humidityText);

    append(windSpeed, windSpeedDescText);
    append(windSpeed, windSpeedSvg);
    append(windSpeed, windSpeedText);

    append(uvIndex, uvIndexDescText);
    append(uvIndex, uvIndexSvg);
    append(uvIndex, uvIndexText);

    append(sunrise, sunriseDescText);
    append(sunrise, sunriseSvg);
    append(sunrise, sunriseText);

    append(sunset, sunsetDescText);
    append(sunset, sunsetSvg);
    append(sunset, sunsetText);

    append(elements.otherInfo, precipitation);
    append(elements.otherInfo, humidity);
    append(elements.otherInfo, windSpeed);
    append(elements.otherInfo, sunrise);
    append(elements.otherInfo, sunset);
    append(elements.otherInfo, uvIndex);
}

