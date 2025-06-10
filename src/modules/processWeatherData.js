// export function processData(data) {
//     return {
//         location: data.address,
//         fullLocation: data.resolvedAddress,
//         timezone: data.timezone,
//         alert: data.alert,
//         // temp: data.temp,
//         // days
//         getDayDate(index) {
//             return data.days[index].datetime;
//         },
//         getNext5Days(index) {
//             return data.days.slice(index, index + 5);
//         },
//         getDayTemp(index) {
//             return data.days[index].temp;
//         },
//         getDayHumidity(index) {
//             return data.days[index].humidity;
//         },
//         getDayPreciptype(index) {
//             return data.days[index].preciptype;
//         },
//         getDaySunrise(index) {
//             return data.days[index].sunrise;
//         },
//         getDaySunset(index) {
//             return data.days[index].sunset;
//         },
//         getDayCondition(index) {
//             return data.days[index].conditions;
//         },
//         getDayDescription(index) {
//             return data.days[index].description;
//         },
//         getDayIconDesc(index) {

//             return data.days[index].icon;
//         },
//         getDayHours(index) {
//             return data.days[index].hours;
//         },
//         getDays() {
//             return data.days;
//         },
//         getDay(index) {
//             return data.days[index];
//         },
//         // hours
//         getHourTemp(index, hour) {
//             return data.days[index].hours[hour].temp;
//         },
//         getHourHumidity(index, hour) {
//             return data.days[index].hours[hour].humidity;
//         },
//         getHourDatetime(index, hour) {
//             return data.days[index].hours[hour].datetime;
//         },

//         getHourCondition(index, hour) {
//             return data.days[index].hours[hour].condition;
//         },
//         getHourDescription(index, hour) {
//             return data.days[index].hours[hour].description;
//         },
//         getHourIconDesc(index, hour) {
//             return data.days[index].hours[hour].icon;
//         },
//     };
// }

import { findIndex, findDateObj,today } from './indexTracker';

export function processData(data) {
    return {
        location: data.address,
        fullLocation: data.resolvedAddress,
        timezone: data.timezone,
        alert: data.alert,
        // temp: data.temp,
        // days
        getDayDate(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.datetime : null ;
        },
        getNext5Days() {
            const index = findIndex(today());
            return data.days.slice(index, index + 5);
        },
        getDayTemp(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.temp : null;
        },
        getDayUV(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.uvindex : null;
        },
        getDayHumidity(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.humidity : null;
        },
        getDayPreciptype(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.preciptype : null;
        },
        getDayPrecip(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.precipprob : null;
        },
        getDaySunrise(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.sunrise : null;
        },
        getDaySunset(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.sunset : null;
        },
        getDayWindSpeed(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.windspeed : null;
        },
        getDayCondition(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.conditions : null;
        },
        getDayDescription(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.description : null;
        },
        getDayIconDesc(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.icon : null;
        },
        getDayHours(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.hours : null;
        },
        getDays() {
            return data.days;
        },
        getDay(date) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj: null;
        },
        // hours
        getHourTemp(date, hour) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.hours[hour].temp : null;
        },
        getHourHumidity(date, hour) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.hours[hour].humidity : null;
        },
        getHourDatetime(date, hour) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.hours[hour].datetime : null;
        },

        getHourCondition(date, hour) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.hours[hour].condition : null;
        },
        getHourDescription(date, hour) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.hours[hour].description : null;
        },
        getHourIconDesc(date, hour) {
            const dateObj = findDateObj(date)
            return dateObj ? dateObj.hours[hour].icon : null;
        },
    };
}
