import { selector, selectorAll, createElement, append } from './utility';

import { iconsSvg } from './icons';
import { data } from '..';
// Create form,
const components = {
    form: createElement('form'),
    label: createElement('label', '', 'Enter Location', ''),
    input: createElement('input', '', '', 'location'),
    btn: createElement('button', '', 'Check Location'),
};

export const elements = {
    container: selector('.container'),
    currentInfo: selector('.current-info'),
};

components.label.setAttribute('for', 'location');
components.input.setAttribute('name', 'location');
components.btn.type = 'submit';
export function renderUi() {
    append(components.form, components.label);
    append(components.form, components.input);
    append(components.form, components.btn);
    // append(elements.container, components.form);

    // getFormData();
    components.form.addEventListener('submit', getFormData);

    addWeatherIcon();
}

function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(components.form);
    console.log(formData.get('location'));
    components.form.reset();
}

function addWeatherIcon() {
    const currentWeatherDiv = createElement('div', 'current-weather');
    const currentCondition = createElement('p', 'curr-condition');
    const currentTemp = createElement(
        'h2',
        'curr-temp',
        `${data.getDayTemp(0)}°F`,
    );
    currentWeatherDiv.innerHTML = iconsSvg.clearSky;
    currentCondition.textContent = 'Currently Sunny';
    console.log(data.temp);

    append(elements.currentInfo, currentWeatherDiv);
    append(elements.currentInfo, currentCondition);
    append(elements.currentInfo, currentTemp);
}
