#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/stogare.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token not provided!');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved!');
    } catch (error) {
        printError(error);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError('City not provided!');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved!');
    } catch (error) {
        printError(error);
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather);
    } catch (error) {
        if (error?.response?.status === 404) {
            printError('Incorrect city!');
        } else if (error?.respose?.status === 401) {
            printError('Incorrect token!')
        } else {
            printError(error.message);
        };
    };
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForecast();
};

initCLI();
