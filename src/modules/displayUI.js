import {
    format,
    parseISO,
    isToday,
    isTomorrow,
    differenceInMinutes,
} from 'date-fns';
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
    inputWrapper: createElement('div', 'input-wrapper'),

    btn: createElement('button', '', 'Check Location'),
    spanError: createElement('span', 'error', '', 'locError'),
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

let indexCount = 0;
let startTimer;
export function renderUi() {
    elements.currentInfo.innerHTML = '';
    elements.navPeriod.innerHTML = '';
    elements.hourly.innerHTML = '';
    elements.otherInfo.innerHTML = '';

    const inputSvg = createElement('button', 'input-svg');
    inputSvg.innerHTML = iconsSvg.search;
    inputSvg.type = 'submit';

    append(components.inputWrapper, inputSvg);
    append(components.inputWrapper, components.input);
    append(components.form, components.inputWrapper);
    // append(components.form, components.btn);
    append(components.form, components.spanError);
    append(elements.formDiv, components.form);

    const activeDate = getActiveDate();
    addWeatherIcon(activeDate);
    otherWeatherEle(activeDate);

    selectorAll('.nav-item').forEach((button) => {
        if (button.getAttribute('data-date') === getActiveDate()) {
            button.classList.add('active');
        }
    });
    // resetTimer();
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
    getBgImage(currentIcon).then((imgUrl) => {
        document.body.style.backgroundImage = `url(${imgUrl})`;
    });
    

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

    renderHourly(activeDate);
    renderCurrentWeek();
}
// i need an activeDate count for this

function renderHourly(activeDate) {
    const data = dataManager.getData();
    const hours = data.getDayHours(activeDate);
    console.log(hours);
    hours.forEach((element) => {
        const currTimeEpoch = Math.floor(Date.now() / 1000);
        const timeEpoch = element.datetimeEpoch + 3600;
        if (currTimeEpoch > timeEpoch) return;

        const box = createElement('div', 'hourly-card');
        const heading = createElement('div', 'hourly-heading');
        const time = createElement('h3', 'hourly-time');
        const svgBox = createElement('div', 'hourly-svg');
        const degree = createElement('p', 'hourly-degree');
        const feels = createElement('p', 'hourly-feels');
        const condition = createElement('p', 'hourly-condition');
        const precip = createElement('p', 'hourly-precip');

        const hourIndex = hours.indexOf(element);
        const hour = data.getHourDatetime(activeDate, hourIndex);

        const datetime = new Date(`${activeDate}T${hour}`);

        svgBox.innerHTML = getSvgIcon(element.icon);
        console.log(element);
        degree.textContent = element.temp;
        feels.textContent = `Feels like ${element.feelslike}`;
        condition.textContent = element.conditions;
        time.textContent = formattedHour(
            element.datetimeEpoch * 1000,
            datetime,
        );
        precip.textContent = `${Math.round(element.precipprob)}% chance of rain`;

        time.classList.add('hour-item');
        svgBox.classList.add('hour-item');
        degree.classList.add('hour-item');
        feels.classList.add('hour-item');
        condition.classList.add('hour-item');
        precip.classList.add('hour-item');

        append(box, time);
        append(box, svgBox);
        // append(box, heading);
        append(box, degree);
        append(box, feels);
        // append(box, condition);
        append(box, precip);

        append(elements.hourly, box);
    });

    components.rightSvg.innerHTML = iconsSvg.right;
    components.leftSvg.innerHTML = iconsSvg.left;

    append(elements.hourly, components.rightSvg);
    append(elements.hourly, components.leftSvg);

    components.rightSvg.addEventListener('click', () => {
        // resetTimer();
        swipeRight();
    });
    components.leftSvg.addEventListener('click', () => {
        // resetTimer();
        swipeLeft;
    });

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
        // console.log(element.icon);
        const boxDate = createElement('h3', '', `${friendlyDate(date)}`);
        box.setAttribute('aria-label', element.description || 'Day item');
        box.setAttribute('data-date', element.datetime);

        append(box, icon);
        append(box, boxDate);
        append(elements.navPeriod, box);
        indexCount = 0;
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

function renderHourBg(currentIcon) {
    switch (currentIcon) {
        case 'clear-day':
            return 'linear-gradient(to bottom, #fceabb, #f8b500)';

        // case 'clear-night':
        //     return iconsSvg.clearNight;

        case 'partly-cloudy-day':
            return 'linear-gradient(to bottom, #d3cce3, #e9e4f0);';

        case 'rain':
            return 'linear-gradient(to bottom, #4b79a1, #283e51);';

        case 'snow':
            return 'linear-gradient(to bottom, #e6dada, #274046)';
        case 'cloudy':
            return 'linear-gradient(to bottom, #bdc3c7, #2c3e50)';
        default:
            return iconsSvg.cloudy;
    }
}
// CHANGE FROM INDEX TO DATE
function friendlyDate(date) {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM dd');
}

function otherWeatherEle(date) {
    const data = dataManager.getData();

    const precipitation = createElement('div', 'other-item');
    const precipitationSvg = createElement('div', 'per-svg');
    const precipitationText = createElement('p', 'item-value');
    const precipitationDescText = createElement(
        'p',
        'item-name',
        'Precipitation',
    );

    const uvIndex = createElement('div', 'other-item');
    const uvIndexSvg = createElement('div', 'uv-svg');
    const uvIndexText = createElement('p', 'item-value');
    const uvIndexDescText = createElement('p', 'item-name', 'uvIndex');

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
    const windSpeedDescText = createElement('p', 'item-name', 'windSpeed');

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

const formattedHour = (dateToFormat, hour) => {
    const now = new Date();
    const diff = differenceInMinutes(now, dateToFormat);

    if (diff >= 0 && diff <= 60) {
        return 'now';
    }
    return format(hour, 'h a');
};

function swipeRight() {
    const hours = document.querySelectorAll('.hourly-card');
    const currHour = hours[indexCount];
    // currHour.className = 'active';

    console.log('indexCount:', indexCount);
    if (indexCount === hours.length - 3) {
        indexCount = 0;
        hours.forEach((h) => h.classList.remove('hide'));
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
    const hours = document.querySelectorAll('.hourly-card');
    const currHour = hours[indexCount];
    currHour.classList.remove('hide');
}
function resetTimer() {
    clearInterval(startTimer);

    startTimer = setInterval(() => {
        swipeRight();
    }, 4000);
}




const getBgImage = async (condition) => {
    console.log(condition);
    const image = await import(`../assets/images/${condition}.jpg`);
    return image.default;
};
// const setAttributesColor = (icon) => {
//   const colors = colorMap[icon] || { text: '#333', bg: '', shadow: '' };

//   document.documentElement.style.setProperty('--text-color', colors.text);
//   if (colors.bg) document.documentElement.style.setProperty('--bg-color', colors.bg);
//   if (colors.shadow) document.documentElement.style.setProperty('--shadow-color', colors.shadow);

//   return colors;
// };

