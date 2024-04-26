export const ipAddress = async (mobile) => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        throw error; // Throw the error to be handled by the caller
    }
}
