import IDailyConfig from "../src/calls/interfaces/IDailyConfig";

export const config = {
    port: 8543,
    daily: {
        url: 'https://api.daily.co/v1',
        apiKey: 'YOUR_API_KEY'
    } as IDailyConfig,
}