import axios from 'axios';
import { getKeyValue, STORAGE_DICT } from './storage.service.js';

function getIconByCode(iconCode) {
  const code = parseInt(iconCode.slice(0, -1));

  switch (code) {
    case 1:
      return '☀️';
    case 2:
      return '⛅';
    case 3:
      return '☁️';
    case 4:
      return '☁️';
    case 9:
      return '🌧';
    case 10:
      return '🌦';
    case 11:
      return '🌩';
    case 13:
      return '❄️';
    case 50:
      return '🌫';
  }
}

async function getWeather() {
  const city = process.env.WEATHER_CLI_CITY ?? (await getKeyValue(STORAGE_DICT.city));
  if (!city) {
    throw new Error("City doesn't exist. To set it use -c [CITY] option");
  }

  const token = process.env.WEATHER_CLI_TOKEN ?? (await getKeyValue(STORAGE_DICT.token));
  if (!token) {
    throw new Error("Token doesn't exist. To set it use -t [TOKEN] option");
  }

  const lang = process.env.WEATHER_CLI_LANG ?? (await getKeyValue(STORAGE_DICT.lang)) ?? 'en';

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang,
      units: 'metric',
    },
  });

  return data;
}

export { getWeather, getIconByCode };
