import https from 'node:https';
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

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('q', city);
  url.searchParams.append('appid', token);
  url.searchParams.append('lang', lang);
  url.searchParams.append('units', 'metric');

  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let rawData = '';

      response.on('data', chunk => {
        rawData += chunk;
      });

      response.on('end', () => {
        const data = JSON.parse(rawData);

        if (data.cod && Number(data.cod) >= 400) {
          reject(new Error(data.message));
        } else {
          resolve(data);
        }
      });

      response.on('error', error => {
        reject(error);
      });
    });
  });
}

export { getWeather };
