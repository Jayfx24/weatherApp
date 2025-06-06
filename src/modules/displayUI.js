import { format, parseISO,isToday, isTomorrow } from 'date-fns';
import {
    selector,
    selectorAll,
    createElement,
    append,
    svgParser,
} from './utility';

import { findIndex, getCurrentIndex, getActiveDate } from './indexTracker';
import { iconsSvg } from './icons';
import { data } from '..';
// Create form,

let currentIndex = 0;

const components = {
    form: createElement('form'),
    label: createElement('label', '', 'Enter Location', ''),
    input: createElement('input', '', '', 'location'),
    btn: createElement('button', '', 'Check Location'),
};

export const elements = {
    container: selector('.container'),
    currentInfo: selector('.current-info'),
    hourly: selector('.hourly'),
    sidebar: selector('.sidebar'),
};

components.label.setAttribute('for', 'location');
components.input.setAttribute('name', 'location');
components.btn.type = 'submit';

export function renderUi() {
    elements.currentInfo.innerHTML = '';
    elements.sidebar.innerHTML = '';
    elements.hourly.innerHTML = '';
    append(components.form, components.label);
    append(components.form, components.input);
    append(components.form, components.btn);
    // append(elements.container, components.form);

    
    // components.form.addEventListener('submit', getFormData);

    // const index = getCurrentIndex();
    // addWeatherIcon(index);
    const activeDate = getActiveDate();
    addWeatherIcon(activeDate);
}

function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(components.form);
    console.log(formData.get('location'));
    components.form.reset();
}

function addWeatherIcon(activeDate) {
    const iconsType = [
        'snow',
        'snow-showers-day',
        'snow-showers-night',
        'thunder-rain',
        'thunder-showers-day',
        'thunder-showers-night',
        'rain',
        'showers-day',
        'showers-night',
        'fog',
        'wind',
        'cloudy',
        'partly-cloudy-day',
        'partly-cloudy-night',
        'clear-day',
        'clear-night',
    ];
    console.log(activeDate);

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

    const currHumidity = createElement('span', 'curr-humidity');

    currentWeatherSvg.innerHTML = getSvgIcon(currentIcon);
    currHumiditySvg.innerHTML = iconsSvg.humidity;
    console.log(currentIcon);
    // append(currHumidity, currHumiditySvg)
    // append(currHumidity,currHumidityText)
    append(currentWeatherTexts, currDate);
    append(currentWeatherTexts, currentTemp);
    append(currentWeatherTexts, currentCondition);
    append(currentWeatherTexts, currHumidity);
    append(currentWeatherTexts, currentCondition);
    append(elements.currentInfo, currentWeatherSvg);
    append(elements.currentInfo, currentWeatherTexts);
    // append(elements.currentInfo, currentWeatherDiv);

    createSliderBox(activeDate);
    renderCurrentWeek(activeDate);
}
// i need an activeDate count for this

function createSliderBox(activeDate) {
    console.log(data.getDayHours(activeDate));
    data.getDayHours(activeDate).forEach((element) => {
        const box = createElement('div', 'hourly-item');
        const svgBox = createElement('div', 'hourly-svg');
        svgBox.innerHTML = getSvgIcon(element.icon);

        // console.log(element.icon);
        append(box, svgBox);
        append(elements.hourly, box);
    });
}

function renderCurrentWeek(activeDate) {
    const comingDays = data.getNext5Days();
    console.log(comingDays);
    comingDays.forEach((element) => {
        const box = createElement('button', 'sidebar-item');
        const icon = svgParser(getSvgIcon(element.icon));
        const date = parseISO(element.datetime);

        const boxDate = createElement(
            'h3',
            '',
            `${friendlyDate(date)}`,
        );
        box.setAttribute('aria-label', element.description || 'Day item');
        box.setAttribute('data-date', element.datetime);

        append(box, icon);
        append(box, boxDate);
        append(elements.sidebar, box);
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

            default:
                return '';
        }
    }
}
// reminder: if icon type not found use loading icon

// CHANGE FROM INDEX TO DATE
function friendlyDate(date){
    if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEE, MMM dd yyyy')

}