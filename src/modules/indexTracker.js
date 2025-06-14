// import { data } from '..';
import { dataManager } from './dataManager';


let activeDate = null
export let today = () => new Date().toISOString().split('T')[0];


export const getActiveDate = () => activeDate;

export const findIndex = (date) => {
    const data = dataManager.getData()
    const days = data.getDays();
    const currIndex = days.indexOf(days.find((day) => day.datetime === date));
    
    if (currIndex === -1) {
        console.warn(`${date} not found in days array`);
    }
    return currIndex;
};

export const setActiveDate = (value) => (activeDate = value);


export const findDateObj = (date) => {
    const data = dataManager.getData()

    const days = data.getDays();
    const currDateObj = days.find((day) => day.datetime === date);
    // console.log(currDateObj);
    if (!currDateObj) {
        console.warn(`${date} not found in days array`);
    }
    return currDateObj;
};