# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information and forecasts.

## Features
- Current weather conditions
- Daily weather forecasts
- Support for metric and imperial units
- WeatherXU API integration

## Setup
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create `.env` file with:
```
WEATHER_API_KEY=your_api_key_here
```

## Available Tools
- `get-current-weather`: Get current weather conditions
  - Parameters: latitude, longitude, units (metric/imperial)
- `get-forecast`: Get daily weather forecast
  - Parameters: latitude, longitude, units (metric/imperial)

## Dependencies
- @modelcontextprotocol/sdk
- zod
- dotenv

## Running
```bash
npm start
```

## API Reference
Base URL: https://api.weatherxu.com/v1/weather 