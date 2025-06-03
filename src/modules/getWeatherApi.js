const API_KEY = 'K86V56UEDMAUFFCR4UHMUCUGH';
const BASE_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;

export async function requestWeatherData(location) {
    try {
        const params = new URLSearchParams({
            location: location,
            key: API_KEY,
            iconSet:icons2,
        });
        const response = await fetch(`${BASE_URL}?${params}`);

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status} ${response.statusText}`,
            );
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        throw error;
    }
}
