import chalk from 'chalk';
import dedent from 'dedent-js'

const getIcon = (code) => {
    switch (code.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
    }
};


const printError = (error) => {
    console.log(chalk.black.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.black.bgGreen('SUCCESS') + ' ' + message)
};

const printHelp = () => {
    console.log(
        dedent(`${chalk.black.bgMagenta(' HELP ')}
        Without parameters - weather output
        -s [CITY] to set city
        -h for help output
        -t [API_KEY] to set token
        `)
    );
};

const printWeather = (weather) => {
    console.log(
        dedent(`${chalk.black.bgYellow(' WEATHER ')}
        ${weather.name}, ${weather.sys.country} - ${weather.weather[0].description} ${getIcon(weather.weather[0].icon)}
        Temperature: ${Math.round(weather.main.temp)}°C (feels like ${Math.round(weather.main.feels_like)}°C)
        Humidity: ${weather.main.humidity}%
        Wind speed: ${weather.wind.speed} m/s
        `)
    );
};

export { printError, printSuccess, printHelp, printWeather };
