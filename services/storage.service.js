import { homedir } from 'node:os';
import { join } from 'node:path';
import { readFile, writeFile, access } from 'node:fs/promises';

const filePath = join(homedir(), '.weather-cli.json');

const STORAGE_DICT = {
  city: 'city',
  token: 'token',
  lang: 'lang',
};

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function getFileData() {
  const exists = await fileExists(filePath);

  if (exists) {
    const rawData = await readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(rawData);
  } else {
    return undefined;
  }
}

async function saveKeyValue(key, value) {
  const data = (await getFileData()) ?? {};
  data[key] = value;
  const rawData = JSON.stringify(data);
  await writeFile(filePath, rawData);
}

async function getKeyValue(key) {
  const data = await getFileData();
  return data?.[key];
}

export { saveKeyValue, getKeyValue, STORAGE_DICT };
