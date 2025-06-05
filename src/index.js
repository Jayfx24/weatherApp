import './style.css';
import testData from './test.json';
import { requestWeatherData } from './modules/getWeatherApi';
import { getWeatherData } from './modules/processWeatherData';
import { renderUi } from './modules/displayUI';
import { findIndex, setIndex } from './modules/indexTracker';

// const data = await requestWeatherData('Lagos');
// console.log(data);

export const data = getWeatherData(testData);

let today = () => new Date().toISOString().split('T')[0];

const currDayIndex = findIndex(today());
setIndex(currDayIndex);

renderUi();
// console.log(testData.days[0]);
// console.log(data.getHourDatetime(2, 23));
// add uxindex sunrise sunset
// SHOULD CHANGE TO SIDEITEM DATA WHEN CLICKED