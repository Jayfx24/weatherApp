import './style.css';
import testData from './test.json';
import { requestWeatherData } from './modules/getWeatherApi';
import { processData } from './modules/processWeatherData';
import {
    renderUi,
    renderDayInfo,
    renderHourly,
    elements,
    components,
} from './modules/displayUI';
import { setActiveDate, today } from './modules/indexTracker';
import { dataManager } from './modules/dataManager';
import { tempCategory, showLoading, hideLoading } from './modules/utility';
import { getUserServerLocation } from './modules/defaultLocation';

// dataManager.setData(processData(testData));

async function app() {
    showLoading();
    setActiveDate(today());
    const ipLoc = await getUserServerLocation();
    const requestLocation = ipLoc
        ? `${ipLoc.city}, ${ipLoc.country}`
        : 'New York';

    const requestData = await requestWeatherData(requestLocation);
    const data = processData(requestData);

    // console.log(requestData);
    if (data) dataManager.setData(data);
    renderUi();

    setTimeout(hideLoading, 500);

    // elements.navPeriod.addEventListener('mouseover',renderSelectedBtn);
    elements.navPeriod.addEventListener('click', renderSelectedBtn);
    elements.sideHeader.addEventListener('click', changeTempType);
    components.form.addEventListener('submit', getFormData);
}

function renderSelectedBtn(e) {
    const target = e.target.closest('button');

    if (!target || !elements.navPeriod.contains(target)) return;
    const dataDate = target.getAttribute('data-date');
    setActiveDate(dataDate);
    // console.log(`changing Active Date to ${id}`);

    renderUi();
}
async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(components.form);
    const loc = formData.get('location');
    showLoading();
    const requestData = await requestWeatherData(loc);
    if (!requestData) {
        components.spanError.textContent = `Error: ${loc.toUpperCase()} not found `;
        hideLoading();
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
    hideLoading();
}
// enable searching and display of user input
app();

function changeTempType(e) {
    const target = e.target.closest('.side-btn');

    if (!target) return;
    const isCelsius = tempCategory.isCelsius();
    target.textContent = isCelsius ? '°C' : '°F';
    tempCategory.change();

    renderDayInfo();
    renderHourly();
}

// FIX ERROR FOR INVALID API REQUEST DONE
// ADD FORM ERRORS DONE
// UPDATE WITH OTHER ELEMENTS E.G HUMIDITY ETC DONE
// FIGURE OUT SEARCH PARAMS LOCATION DONE
// IMPROVE UI DONE
// SHOW FORM ERROR DONE
// SET DEFINED WIDTH TO HOUR CARD
// IMPROVE UI AND AND EFFECTS done

// ADD BUTTON FOR CHANGING TEMP
// style button and add loading screen DONE
// FIGURE OUT USER LOCAL NETWORK API AND ADD WAIT LOADING SCREEN DONE
// FIX TEMP BUTTON BUG DONE
// CONSIDER ADDING BOX-S TO NAV BTNS DONE
// add credits

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.visibility = "visible";
});
