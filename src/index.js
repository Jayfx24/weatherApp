import './style.css';
import testData from './test.json';
import { requestWeatherData } from './modules/getWeatherApi';
import { getWeatherData } from './modules/processWeatherData';
import { renderUi, elements } from './modules/displayUI';
import { findIndex, setIndex, setActiveDate, today} from './modules/indexTracker';

// const data = await requestWeatherData('Lagos');
// console.log(data);

export const data = getWeatherData(testData);



setActiveDate(today());
renderUi();


// add uxindex sunrise sunset
// SHOULD CHANGE TO SIDEITEM DATA WHEN CLICKED

// elements.sidebar.addEventListener('mouseover',renderSelectedBtn);
elements.sidebar.addEventListener('click',renderSelectedBtn);

function renderSelectedBtn(e) {
    const target = e.target.closest('button');

    if (!target|| !elements.sidebar.contains(target)) return;

    const id = target.getAttribute('data-date');
    setActiveDate(id)
    console.log(`changing Active Date to ${id}`)
        
    
    renderUi()




}

// enable searching and display of user input
