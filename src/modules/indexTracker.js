import { data } from '..';

let currentIndex = 0;

export const getCurrentIndex = () => currentIndex;

export const findIndex = (date) => {
    const days = data.getDays();
    const currIndex = days.indexOf(days.find((day) => day.datetime === date));
    console.log(date);
    console.log(currIndex);
    if (currIndex === -1) {
        console.warn(`${date} not found in days array`);
    }
    return currIndex;
};

export const setIndex = (value) => (currentIndex = value);
