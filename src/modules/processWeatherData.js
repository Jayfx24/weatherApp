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
            return data.days[index].condition;
        },
        getDayDescription(index) {
            return data.days[index].description;
        },
        getDayIconDesc(index) {
            return data.days[index].icon;
        },
        // hours
        getHourTemp(index,hour) {
            return data.days[index].hours[hour].temp;
        },
        getHourHumidity(index,hour) {
            return data.days[index].hours[hour].humidity;
        },
        getHourDatetime(index,hour) {
            return data.days[index].hours[hour].datetime;
        },
        
        getHourCondition(index,hour) {
            return data.days[index].hours[hour].condition;
        },
        getHourDescription(index,hour) {
            return data.days[index].hours[hour].description;
        },
        getHourIconDesc(index,hour) {
            return data.days[index].hours[hour].icon;
        },
    };
}
