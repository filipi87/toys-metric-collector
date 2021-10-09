import IDailyConfig from "../src/calls/interfaces/IDailyConfig";

export const config = {
    port: 8543,
    daily: {
        url: 'https://api.daily.co/v1',
        apiKey: '4d4de2a5d35f1f5f25445be137f6d92e5c0848ae1798847a786eee3b9ada47d9'
    } as IDailyConfig,
}