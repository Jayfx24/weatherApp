import './style.css';
import testData from './test2.json';
import { requestWeatherData } from './modules/getWeatherApi';
import { processData } from './modules/processWeatherData';
import { renderUi, elements, components } from './modules/displayUI';
import {
    findIndex,
    setIndex,
    setActiveDate,
    today,
} from './modules/indexTracker';
import { dataManager } from './modules/dataManager';

// export let data = processData(testData);
dataManager.setData(processData(testData));

function app() {
    setActiveDate(today());
    renderUi();

    // elements.navPeriod.addEventListener('mouseover',renderSelectedBtn);
    elements.navPeriod.addEventListener('click', renderSelectedBtn);
    components.form.addEventListener('submit', getFormData);
}

function renderSelectedBtn(e) {
    const target = e.target.closest('button');

    if (!target || !elements.navPeriod.contains(target)) return;
    const id = target.getAttribute('data-date');
    setActiveDate(id);
    console.log(`changing Active Date to ${id}`);
    
    renderUi();
    
}
async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(components.form);
    const loc = formData.get('location');

    const requestData = await requestWeatherData(loc);
    if (!requestData) {
        components.spanError.textContent = 
            `${loc} is not on the database or does not exists! `;
        
        return;
    }
    components.spanError.textContent = '';
    const freshData = processData(requestData);

    console.log(requestData);
    if (freshData) dataManager.setData(freshData);
    console.log(loc);
    components.form.reset();
    setActiveDate(today());
    renderUi();
}
// enable searching and display of user input
app();
// FIX ERROR FOR INVALID API REQUEST DONE
// ADD FORM ERRORS DONE
// UPDATE WITH OTHER ELEMENTS E.G HUMIDITY ETC DONE
// FIGURE OUT SEARCH PARAMS LOCATION DONE
// IMPROVE UI
// SHOW FORM ERROR
// FIGURE OUT USER LOCAL NETWORK API AND ADD WAIT LOADING SCREEN

function showFormError() {}
