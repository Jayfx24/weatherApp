import { format, parseISO, isToday, isTomorrow } from 'date-fns';
import {
    selector,
    selectorAll,
    createElement,
    append,
    svgParser,
} from './utility';

import {
    findIndex,
    getCurrentIndex,
    getActiveDate,
    setActiveDate,
    today,
} from './indexTracker';
import { iconsSvg } from './icons';

import { dataManager } from './dataManager';
// Create form,

export const components = {
    form: createElement('form'),
    label: createElement('label', '', 'Enter Location', ''),
    input: createElement('input', '', '', 'location'),
    btn: createElement('button', '', 'Check Location'),
    spanError: createElement('span', '', '', 'locError'),
    rightSvg: createElement('div', 'right-svg'),
    leftSvg: createElement('div', 'left-svg'),
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
};

components.label.setAttribute('for', 'location');
components.input.setAttribute('name', 'location');
components.input.setAttribute('placeholder', 'Search location');
components.btn.type = 'submit';

let indexCount = 0;

export function renderUi() {
    elements.currentInfo.innerHTML = '';
    elements.navPeriod.innerHTML = '';
    elements.hourly.innerHTML = '';
    elements.otherInfo.innerHTML = '';

    // append(components.form, components.label);
    append(components.form, components.input);
    append(components.form, components.btn);
    append(components.form, components.spanError);
    append(elements.formDiv, components.form);

    // components.form.addEventListener('submit', getFormData);

    // const index = getCurrentIndex();
    // addWeatherIcon(index);
    const activeDate = getActiveDate();
    addWeatherIcon(activeDate);
    otherWeatherEle(activeDate);

    selectorAll('.nav-item').forEach((button) => {
        if (button.getAttribute('data-date') === getActiveDate()) {
            button.classList.add('active');
        }
    });
}

function addWeatherIcon(activeDate) {
    console.log(activeDate);
    const data = dataManager.getData();

    const currentIcon = data.getDayIconDesc(activeDate);
    // const currentWeatherDiv = createElement('div', 'current-weather');
    const currentWeatherSvg = createElement('div', 'curr-weather-svg');
    const currentWeatherTexts = createElement('div', 'current-weather-txt');
    const currHumiditySvg = createElement('div', 'current-svg');
    const currHumidityText = createElement(
        'div',
        'current-txt',
        data.getDayHumidity(activeDate),
    );

    const currentCondition = createElement(
        'p',
        'curr-Desc',
        `${data.getDayCondition(activeDate)}`,
    );

    const date = parseISO(data.getDayDate(activeDate));
    const currDate = createElement(
        'p',
        'curr-Date',
        `${format(date, 'EEE, MMM dd yyyy')}`,
    );
    console.log(data.getDayDate(activeDate));
    const currentTemp = createElement(
        'h2',
        'curr-temp',
        `${data.getDayTemp(activeDate)}°F`,
    );

    const currLocation = createElement(
        'h2',
        'curr-temp',
        `${data.fullLocation}`,
    );

    const currHumidity = createElement('span', 'curr-humidity');

    currentWeatherSvg.innerHTML = getSvgIcon(currentIcon);
    currHumiditySvg.innerHTML = iconsSvg.humidity;
    console.log(currentIcon);
    // append(currHumidity, currHumiditySvg)
    // append(currHumidity,currHumidityText)
    append(currentWeatherTexts, currLocation);

    append(currentWeatherTexts, currDate);
    append(currentWeatherTexts, currentTemp);
    append(currentWeatherTexts, currentCondition);
    append(currentWeatherTexts, currHumidity);
    append(currentWeatherTexts, currentCondition);
    append(elements.currentInfo, currentWeatherSvg);
    append(elements.currentInfo, currentWeatherTexts);
    // append(elements.currentInfo, currentWeatherDiv);

    createSliderBox(activeDate);
    renderCurrentWeek();
}
// i need an activeDate count for this

function createSliderBox(activeDate) {
    const data = dataManager.getData();
    const hours = data.getDayHours(activeDate);
    console.log(hours);
    hours.forEach((element) => {
        const box = createElement('div', 'hourly-item');
        const boxText = createElement('p', 'hourly-item-text');
        const svgBox = createElement('div', 'hourly-svg');
        svgBox.innerHTML = getSvgIcon(element.icon);
        boxText.textContent = `${data.getHourDatetime(activeDate, hours.indexOf(element))}`;

        // console.log(element.icon);
        append(box, svgBox);
        append(box, boxText);
        append(elements.hourly, box);
    });

    components.rightSvg.innerHTML = iconsSvg.right;
    components.leftSvg.innerHTML = iconsSvg.left;

    append(elements.hourly, components.rightSvg);
    append(elements.hourly, components.leftSvg);

    components.rightSvg.addEventListener('click', swipeRight);
    components.leftSvg.addEventListener('click', swipeLeft);

    // swipeRight();
}

function renderCurrentWeek() {
    const data = dataManager.getData();
    const comingDays = data.getNext5Days();
    console.log(comingDays);
    comingDays.forEach((element) => {
        const box = createElement('button', 'nav-item');
        // const box = createElement('button', 'sidebar-item');
        const icon = svgParser(getSvgIcon(element.icon));
        const date = parseISO(element.datetime);
        console.log(element.icon);
        const boxDate = createElement('h3', '', `${friendlyDate(date)}`);
        box.setAttribute('aria-label', element.description || 'Day item');
        box.setAttribute('data-date', element.datetime);

        append(box, icon);
        append(box, boxDate);
        append(elements.navPeriod, box);
    });
}

function getSvgIcon(currentIcon) {
   
    if (iconsSvg[currentIcon]) {
        return iconsSvg[currentIcon];
    } else {
        switch (currentIcon) {
            case 'clear-day':
                return iconsSvg.clearSky;

            case 'clear-night':
                return iconsSvg.clearNight;

            case 'partly-cloudy-day':
                return iconsSvg.partlyCloudy;

            case 'partly-cloudy-night':
                return iconsSvg.partlyCloudyNight;

            case 'thunder-rain':
                return iconsSvg.rain;
            case 'thunder-shower-day':
                return iconsSvg.thunderDay;
            default:
                return iconsSvg.cloudy;
        }
    }
}
// reminder: if icon type not found use loading icon

// CHANGE FROM INDEX TO DATE
function friendlyDate(date) {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM dd yyyy');
}

function otherWeatherEle(date) {
    const data = dataManager.getData();

    const precipitation = createElement('div', 'other-item');
    const precipitationSvg = createElement('div', 'per-svg');
    const precipitationText = createElement('p', 'per-text');
    const precipitationDescText = createElement(
        'p',
        'per-text',
        'Precipitation',
    );

    const uvIndex = createElement('div', 'other-item');
    const uvIndexSvg = createElement('div', 'uv-svg');
    const uvIndexText = createElement('p', 'uv-text');
    const uvIndexDescText = createElement('p', 'per-text', 'uvIndex');

    const sunrise = createElement('div', 'other-item');
    const sunriseSvg = createElement('div', 'sunrise-svg');
    const sunriseText = createElement('p', 'sunrise-text');
    const sunriseDescText = createElement('p', 'per-text', 'sunrise');

    const sunset = createElement('div', 'other-item');
    const sunsetSvg = createElement('div', 'sunset-svg');
    const sunsetText = createElement('p', 'sunset-text');
    const sunsetDescText = createElement('p', 'per-text', 'sunset');

    const humidity = createElement('div', 'other-item');
    const humiditySvg = createElement('div', 'humidity-svg');
    const humidityText = createElement('p', 'humidity-text');
    const humidityDescText = createElement('p', 'per-text', 'humidity');

    const windSpeed = createElement('div', 'other-item');
    const windSpeedSvg = createElement('div', 'wind-svg');
    const windSpeedText = createElement('p', 'wind-text');
    const windSpeedDescText = createElement('p', 'per-text', 'windSpeed');

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
    windSpeedText.textContent = `${data.getDayWindSpeed(date)}`;

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

function slideCircle() {
    const hours = dataManager.getDayHours();

    hours.forEach((hour) => {
        const slideDot = createElement('button', 'slide-dots');

        slideDot.setAttribute('role', 'tab');
        slideDot.setAttribute('aria-label', `Slide ${hours.indexOf(hour) + 1}`);
        slideDot.setAttribute('aria-selected', 'false');

        append(elements.slideNav, slideDot);
    });
}

function swipeRight() {
    const hours = document.querySelectorAll('.hourly-item');
    const currHour = hours[indexCount];
    // currHour.className = 'active';

    console.log('indexCount:', indexCount);
    if (indexCount === hours.length) {
        indexCount === 0;
    } else {
        currHour.classList.add('hide');

        indexCount++;
    }
}

function swipeLeft() {
    indexCount--;
    // currHour.className = 'active';

    console.log('indexCount:', indexCount);
    if (indexCount < 0) {
        indexCount = 0;
        return;
    }
    const hours = document.querySelectorAll('.hourly-item');
    const currHour = hours[indexCount];
    currHour.classList.remove('hide');
}
