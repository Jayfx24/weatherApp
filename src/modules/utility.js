import { iconsSvg } from './icons';
import {
    format,
    isToday,
    isTomorrow,
    differenceInMinutes,
} from 'date-fns';

import { dataManager } from './dataManager';


export const selector = (s) => document.querySelector(s);
export const selectorAll = (s) => document.querySelectorAll(s);
export const append = (parent, child) => parent.appendChild(child);

export const createElement = (tag, classname = '', text = '', id = '') => {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (id) element.id = id;
    if (classname) element.classList.add(classname);
    return element;
};

// template above

export function svgParser(string) {
    const parser = new DOMParser();
    const element = parser.parseFromString(string, 'image/svg+xml');
    return element.documentElement;
}
let celsius = false;
export const tempCategory = {
    isCelsius: () => celsius,
    change: () => celsius = !celsius
}

export function showLoading(){
    selector('.loading-overlay').classList.remove('hide')
}
export function hideLoading(){
    selector('.loading-overlay').classList.add('hide')
}

export function getSvgIcon(currentIcon) {
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


export const getBgImage = async (condition) => {
    // console.log(condition);
    const image = await import(`../assets/images/${condition}.jpg`);
    return image.default;
};

export const formattedHour = (dateToFormat, hour) => {
    const now = new Date();
    const diff = differenceInMinutes(now, dateToFormat);

    if (diff >= 0 && diff <= 60) {
        return 'now';
    }
    return format(hour, 'h a');
};


export function friendlyDate(date) {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM dd');
}


