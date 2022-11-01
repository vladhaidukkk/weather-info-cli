import axios from 'axios';
import { getKeyValue, STORAGE_DICT } from './storage.service.js';

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

export { getWeather };
