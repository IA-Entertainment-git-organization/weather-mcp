import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../.env") });

const WEATHER_API_BASE = "https://api.weatherxu.com/v1/weather";
const API_KEY = process.env.WEATHER_API_KEY;

if (!API_KEY) {
  console.error("Error: WEATHER_API_KEY environment variable is not set");
  process.exit(1);
}

interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface DailyForecast {
  forecastStart: number;
  temperatureMin: number;
  temperatureMax: number;
  icon: string;
  precipProbability: number;
}

interface WeatherResponse {
  currently: CurrentWeather;
  daily: {
    data: DailyForecast[];
  };
}

interface WeatherError {
  error: string;
  message: string;
}

// Helper function for making WeatherXU API requests
async function makeWeatherRequest<T>(params: Record<string, string>): Promise<T | null> {
  const headers: Record<string, string> = {
    "X-API-KEY": API_KEY as string,
  };

  const queryParams = new URLSearchParams(params);
  const url = `${WEATHER_API_BASE}?${queryParams.toString()}`;

  try {
    console.error(`Making request to: ${url}`);
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      const error = data as WeatherError;
      console.error(`API Error: ${error.message || response.statusText}`);
      return null;
    }

    if (!data.success) {
      console.error("API returned unsuccessful response");
      return null;
    }

    return data.data as T;
  } catch (error) {
    console.error("Error making WeatherXU request:", error);
    return null;
  }
}

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});

// Register weather tools
server.tool(
  "get-current-weather",
  "Get current weather conditions for a location",
  {
    latitude: z.number().min(-90).max(90).describe("Latitude of the location"),
    longitude: z.number().min(-180).max(180).describe("Longitude of the location"),
    units: z.enum(["metric", "imperial"]).optional().describe("Unit system (metric/imperial)"),
  },
  async ({ latitude, longitude, units = "metric" }) => {
    const params = {
      lat: latitude.toString(),
      lon: longitude.toString(),
      units,
      parts: "currently",
    };

    const weatherData = await makeWeatherRequest<WeatherResponse>(params);
    if (!weatherData) {
      return {
        content: [{ 
          type: "text", 
          text: `Failed to retrieve weather data for coordinates ${latitude}, ${longitude}. Please check if the coordinates are valid and try again.` 
        }],
      };
    }

    const currently = weatherData.currently;
    const formattedWeather = [
      `Current Weather for ${latitude}, ${longitude}:`,
      `Temperature: ${currently.temperature}°${units === "metric" ? "C" : "F"}`,
      `Feels like: ${currently.apparentTemperature}°${units === "metric" ? "C" : "F"}`,
      `Humidity: ${currently.humidity}%`,
      `Wind: ${currently.windSpeed} ${units === "metric" ? "m/s" : "mph"}`,
      `Conditions: ${currently.icon}`,
    ].join("\n");

    return {
      content: [{ type: "text", text: formattedWeather }],
    };
  }
);

server.tool(
  "get-forecast",
  "Get weather forecast for a location",
  {
    latitude: z.number().min(-90).max(90).describe("Latitude of the location"),
    longitude: z.number().min(-180).max(180).describe("Longitude of the location"),
    units: z.enum(["metric", "imperial"]).optional().describe("Unit system (metric/imperial)"),
  },
  async ({ latitude, longitude, units = "metric" }) => {
    const params = {
      lat: latitude.toString(),
      lon: longitude.toString(),
      units,
      parts: "daily",
    };

    const weatherData = await makeWeatherRequest<WeatherResponse>(params);
    if (!weatherData) {
      return {
        content: [{ type: "text", text: "Failed to retrieve forecast data" }],
      };
    }

    const daily = weatherData.daily.data;
    const formattedForecast = daily.map((day: any) => [
      `Date: ${new Date(day.forecastStart * 1000).toLocaleDateString()}`,
      `Temperature: ${day.temperatureMin}°${units === "metric" ? "C" : "F"} - ${day.temperatureMax}°${units === "metric" ? "C" : "F"}`,
      `Conditions: ${day.icon}`,
      `Precipitation: ${day.precipProbability * 100}% chance`,
      "---",
    ].join("\n"));

    return {
      content: [{ type: "text", text: `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join("\n")}` }],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
