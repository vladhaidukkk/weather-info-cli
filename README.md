# weather-info-cli

Node.js CLI to get Weather info.

## Installation

This CLI is published on Npm, so you can download it from there.

```bash
npm i -g weather-info-cli
```

## Usage

After installation, you can run the CLI to get a forecast:

```bash
weather
```

Before that, you must provide the CLI with a city and a token. To get this token, you need to register on [OpenWeather](https://openweathermap.org/) and generate it.

To set the city, run this command:

```bash
weather -c [city]
```

To set the token, run this command:

```bash
weather -t [token]
```

As an additional option, you can set the language:

```bash
weather -l [language]
```

## Help

If you forgot something and need to recall the available options, you can run the help command:

```bash
weather -h
```
