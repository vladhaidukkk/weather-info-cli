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

export { logSuccess, logError, logHelp };
