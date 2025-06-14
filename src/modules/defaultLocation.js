const BASE_IP_URL = 'https://ipapi.co/json';

export async function getUserServerLocation(){
    try{
        
        const response = await fetch(`${BASE_IP_URL}`);

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status} ${response.statusText}`,
            );
        }
        const location = await response.json()
        return location;
        
    }
    catch (error) {
        console.error('Failed to fetch location data:', error);
        // throw error;
    }

}