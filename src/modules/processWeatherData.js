export function getWeatherData(data) {
    return {
        location: data.address,
        fullLocation: data.resolvedAddress,
        timezone: data.timezone,
        alert: data.alert,
        // temp: data.temp,
        // days
        getDayDate(index) {
            return data.days[index].datetime;
        },
        getNext5Days(index) {
            return data.days.slice(index, index + 5);
        },
        getDayTemp(index) {
            return data.days[index].temp;
        },
        getDayHumidity(index) {
            return data.days[index].humidity;
        },
        getDayPreciptype(index) {
            return data.days[index].preciptype;
        },
        getDaySunrise(index) {
            return data.days[index].sunrise;
        },
        getDaySunset(index) {
            return data.days[index].sunset;
        },
        getDayCondition(index) {
            return data.days[index].conditions;
        },
        getDayDescription(index) {
            return data.days[index].description;
        },
        getDayIconDesc(index) {
            

            return data.days[index].icon;
        },
        getDayHours(index) {
            return data.days[index].hours;
        },
        getDays() {
            return data.days;
        },
        getDay(index) {
            return data.days[index];
        },
        // hours
        getHourTemp(index, hour) {
            return data.days[index].hours[hour].temp;
        },
        getHourHumidity(index, hour) {
            return data.days[index].hours[hour].humidity;
        },
        getHourDatetime(index, hour) {
            return data.days[index].hours[hour].datetime;
        },

        getHourCondition(index, hour) {
            return data.days[index].hours[hour].condition;
        },
        getHourDescription(index, hour) {
            return data.days[index].hours[hour].description;
        },
        getHourIconDesc(index, hour) {
            return data.days[index].hours[hour].icon;
        },
    };
}
