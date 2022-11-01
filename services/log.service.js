import chalk from 'chalk';
import dedent from 'dedent';

function logSuccess(msg) {
  console.log(chalk.green(' SUCCESS '), msg);
}

function logError(err) {
  console.log(chalk.red(' ERROR '), err);
}

function logHelp() {
  console.log(
    dedent`${chalk.bgBlue(' HELP ')}

    Show the weather in your city

    ${chalk.bgYellow(' OPTIONS ')}

    ${chalk.bold('-h')} ${chalk.dim('\t\tshow help')}
    ${chalk.bold('-c [CITY]')} ${chalk.dim('\tset city')}
    ${chalk.bold('-t [TOKEN]')} ${chalk.dim('\tset token')}
    ${chalk.bold('-l [LANGUAGE]')} ${chalk.dim('\tset language')}
    `
  );
}

function logWeather(data, icon) {
  console.log(
    dedent`${chalk.bgBlue(' WEATHER ')} ${chalk.blue(`in ${data.name}`)}

    State: ${icon}  ${chalk.bold(data.weather[0].description)}
    Temperature: ${chalk.bold(`${data.main.temp}C (feels like ${data.main.feels_like}C)`)}
    Humidity: ${chalk.bold(`${data.main.humidity}%`)}
    Wind Speed: ${chalk.bold(data.wind.speed)}
    `
  );
}

export { logSuccess, logError, logHelp, logWeather };
