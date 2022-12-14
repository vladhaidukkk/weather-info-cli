#!/usr/bin/env node
import { parseArgs } from './helpers/args.js';
import { logSuccess, logError, logHelp, logWeather } from './services/log.service.js';
import { saveKeyValue, STORAGE_DICT } from './services/storage.service.js';
import { getWeather, getIconByCode } from './services/api.service.js';

async function saveCity(city) {
  if (typeof city !== 'string') {
    return logError("City wasn't specified");
  }

  try {
    await saveKeyValue(STORAGE_DICT.city, city);
    logSuccess('City saved');
  } catch (error) {
    logError(error.message);
  }
}

async function saveToken(token) {
  if (typeof token !== 'string') {
    return logError("Token wasn't specified");
  }

  try {
    await saveKeyValue(STORAGE_DICT.token, token);
    logSuccess('Token saved');
  } catch (error) {
    logError(error.message);
  }
}

async function saveLang(lang) {
  if (typeof lang !== 'string') {
    return logError("Language wasn't specified");
  }

  try {
    await saveKeyValue(STORAGE_DICT.lang, lang);
    logSuccess('Language saved');
  } catch (error) {
    logError(error.message);
  }
}

async function getForecast() {
  try {
    const weather = await getWeather();
    const icon = getIconByCode(weather.weather[0].icon);
    logWeather(weather, icon);
  } catch (error) {
    const code = error?.response?.status;

    switch (code) {
      case 404:
        logError('Invalid city');
        break;
      case 401:
        logError('Invalid token');
        break;
      default:
        logError(error.message);
    }
  }
}

function initCLI() {
  const args = process.argv.slice(2);
  const opts = parseArgs(args);

  if (Object.keys(opts).length === 0) {
    return getForecast();
  }

  if (opts.h) {
    return logHelp();
  }

  if (opts.c) {
    saveCity(opts.c);
  }

  if (opts.t) {
    saveToken(opts.t);
  }

  if (opts.l) {
    saveLang(opts.l);
  }
}

initCLI();
