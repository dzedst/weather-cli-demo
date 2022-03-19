import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './stogare.service.js';

const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('Token API not setted. Set it via command -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'en',
            units: 'metric'
        }
    });
    return data;
};

export { getWeather };