import './style.css';
import testData from './test.json';
import { requestWeatherData } from './modules/getWeatherApi';
import { getWeatherData } from './modules/processWeatherData';
import { renderUi } from './modules/displayUI';
// const data = await requestWeatherData('Lagos');
// console.log(data);

export const data = getWeatherData(testData);
renderUi();
// console.log(testData.days[0]);
console.log(data.getHourDatetime(2, 23));
