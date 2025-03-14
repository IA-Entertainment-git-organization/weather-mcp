Overview (
/weather
)
/weather provides comprehensive weather data including current conditions, hourly forecasts, and daily forecasts for any location worldwide.

Endpoint
GET
Base URL
https://api.weatherxu.com/v1/weather

Request Parameters
Parameter	Description
lat	        Required Latitude of the location (-90 to 90)
lon	        Required Longitude of the location (-180 to 180)
parts	    Optional Choose which data blocks to return. Available options:
            alerts : Alerts
            currently : Current conditions
            hourly : 48-hour forecast
            daily : 10-day forecast
            Default: 'alerts,currently,hourly,daily'

units	    Optional Unit system for response values:
            metric: Temperature in Celsius, wind speed in m/s, ...
            imperial: Temperature in Fahrenheit, wind speed in mph, ...
            Default: 'metric'. See units table for details. 


Units
The weather API response includes various meteorological measurements that can be returned in either imperial or metric units based on the units parameter in your request. This reference table details the resulting units and valid ranges for each attribute in the response payload when you specify units=imperial or units=metric.

Parameter	            Imperial	            Metric
apparentTemperature	     °F	                    °C
cloudCover	              % [0, 1]
dewPoint	             °F	                    °C
forecastEnd	              Unix Timestamp
forecastStart	          Unix Timestamp
humidity	              % [0, 1]
moonPhase	              Decimal [0, 1]
precipIntensity	          in/hr	                mm/hr
precipProbability	      % [0, 1]
pressure	              hPa	                mb
sunriseTime	              Unix Timestamp
sunsetTime	              Unix Timestamp
temperature	              °F	                °C
visibility	              feet	                meters
windDirection	          degrees [0, 360]
windGust	              mph	                km/h
windSpeed	              mph	                km/h

Request Examples
Basic request with query parameter API key:

https://api.weatherxu.com/v1/weather?lat=40.7128&lon=-74.0060&api_key=YOUR_API_KEY

Using API key as a query parameter for New York City weather

Basic request with header API key:

curl https://api.weatherxu.com/v1/weather?lat=40.7128&lon=-74.0060 \
    -H 'X-API-KEY: YOUR_API_KEY'

Using API key in request header for New York City weather

Request only current conditions and daily forecast:

curl https://api.weatherxu.com/v1/weather?lat=51.5074&lon=-0.1278&parts=currently,daily \
    -H 'X-API-KEY: YOUR_API_KEY'

https://api.weatherxu.com/v1/weather?lat=51.5074&lon=-0.1278&parts=currently,daily&api_key=YOUR_API_KEY

Returns only current conditions and 10-day forecast for London, showing both authentication methods

Request with imperial units:

curl https://api.weatherxu.com/v1/weather?lat=34.0522&lon=-118.2437&units=imperial \
    -H 'X-API-KEY: YOUR_API_KEY'

https://api.weatherxu.com/v1/weather?lat=34.0522&lon=-118.2437&units=imperial&api_key=YOUR_API_KEY

Returns all weather data for Los Angeles with temperature in Fahrenheit and wind speed in mph

Request with all parameters:

curl https://api.weatherxu.com/v1/weather?lat=48.8566&lon=2.3522&parts=currently,hourly&units=metric \
    -H 'X-API-KEY: YOUR_API_KEY'

https://api.weatherxu.com/v1/weather?lat=48.8566&lon=2.3522&parts=currently,hourly&units=metric&api_key=YOUR_API_KEY

Returns current conditions and 48-hour forecast for Paris in metric units

Response Example
Below is an abbreviated response for Los Angeles (34.0522°N, -118.2437°W) using metric units. The response includes current conditions, one sample hourly forecast, and one sample daily forecast. In actual responses, you'll receive 48 hours of hourly forecasts and 16 days of daily forecasts.

Sample response (metric)
./train/weatherxu_weather_response_metric.json
https://api.weatherxu.com/v1/weather?lat=34.0522&lon=-118.2437

Sample response (imperial)
./train/weatherxu_weather_response_imperial.json
https://api.weatherxu.com/v1/weather?lat=34.0522&lon=-118.2437&units=imperial

{
    "success": true,
    "data": {
        "latitude": "34.0522",
        "longitude": "-118.2437",
        "units": "metric",
        "timezone": "America/Los_Angeles",
        "timezone_abbreviation": "PDT",
        "timezone_offset": -25200,
        "dt": 1730470213,
        "alerts": [
          {
            "tile": "Coastal Flood Statement issued November 21 at 3:38AM EST until November 21 at 4:00PM EST",
            "description": "Up to one half foot of inundation above ground level\nexpected in vulnerable areas near the waterfront and shoreline.",
            "endsAt": 1732222800
          }
        ],
        "currently": {
            "apparentTemperature": 9.58,
            "cloudCover": 0.13,
            "dewPoint": 5.17,
            "humidity": 68.81,
            "pressure": 1001.7,
            "precipIntensity": 0,
            "temperature": 10.66,
            "visibility": 16093,
            "windGust": 8.82,
            "windSpeed": 3.89,
            "windDirection": 343,
            "icon": "clear"
        },
        "hourly": {
            "data": [
                {
                    "forecastStart": 1730473200,
                    "apparentTemperature": 8.95,
                    "cloudCover": 0.13,
                    "dewPoint": 3.41,
                    "humidity": 79,
                    "pressure": 1002.7,
                    "precipProbability": 0,
                    "precipIntensity": 0,
                    "temperature": 9.85,
                    "visibility": 29900,
                    "windGust": 8.78,
                    "windSpeed": 7.45,
                    "windDirection": 61,
                    "icon": "clear"
                }
                // Additional hourly forecasts for the next 7 days
            ]
        },
        "daily": {
            "data": [
                {
                    "forecastStart": 1730444400,
                    "forecastEnd": 1730530800,
                    "sunriseTime": 1730470456,
                    "sunsetTime": 1730509279,
                    "moonPhase": 0.01,
                    "apparentTemperatureAvg": 13.64,
                    "apparentTemperatureMin": 7.96,
                    "apparentTemperatureMax": 19.31,
                    "cloudCover": 25.5,
                    "dewPointAvg": 6.98,
                    "dewPointMin": 3.29,
                    "dewPointMax": 10.66,
                    "humidity": 66,
                    "pressure": 1001.5,
                    "precipProbability": 0,
                    "precipIntensity": 0,
                    "temperatureAvg": 14.57,
                    "temperatureMin": 9.04,
                    "temperatureMax": 20.1,
                    "visibility": 28110,
                    "windGustAvg": 9.34,
                    "windGustMin": 0.68,
                    "windGustMax": 18,
                    "windSpeedAvg": 7.77,
                    "windSpeedMin": 1.13,
                    "windSpeedMax": 14.42,
                    "windDirectionAvg": 148,
                    "icon": "mostly_cloudy"
                }
                // Additional daily forecasts for the next 16 days
            ]
        }
    }
}


Response Parameters
Please take a look at Units for a complete list of available units for each parameter.

Core
Parameter	        Type	        Description
latitude	        string	        Latitude of the location (-90 to 90)
longitude	        string	        Longitude of the location (-180 to 180)
units	            string	        Unit system for response values. Learn more
timezone	        string	        IANA timezone identifier (e.g., "America/Los_Angeles")
timezone_abbreviation	string	    Timezone abbreviation (e.g., "PDT")
timezone_offset	        number	    Offset from UTC in seconds
dt	                    number	    Unix timestamp for the request


Alerts
Weather alerts at the requested location.

[Array]	
Parameter	        Type	        Description
title	            string	        Alert title
description	        string	        Alert description
endsAt	            number	        Optional Unix timestamp when alert ends


Currently
Current weather conditions at the requested location.

Parameter	            Type	        Description
apparentTemperature	    number	        "Feels like" temperature
cloudCover	            number	        Percentage of sky covered by clouds
dewPoint	            number	        The dew point in degrees
humidity	            number	        Relative humidity percentage
icon	                string	        Weather condition icon identifier
precipIntensity	        number	        Precipitation intensity
pressure	            number	        Sea-level air pressure
temperature	            number	        Air temperature in degrees
uvIndex	                number	        UV index [0-10]
visibility	            number	        Visibility in meters
windDirection	        number	        Wind direction in degrees
windGust	            number	        Wind gust speed
windSpeed	            number	        Wind speed

Hourly
Array containing hour-by-hour forecast for the next 7 days. Each hour contains:

[Array]	
Parameter	            Type	        Description
apparentTemperature	    number	        "Feels like" temperature
cloudCover	            number	        Percentage of sky covered by clouds
dewPoint	            number	        Dew point in degrees
forecastStart	        number	        Unix timestamp for the start of this forecast period
humidity	            number	        Relative humidity percentage
icon	                string	        Weather condition icon identifier
precipIntensity	        number	        Precipitation intensity
precipProbability	    number	        Probability of precipitation percentage [0-1]
pressure	            number	        Sea-level air pressure
temperature	            number	        Air temperature in degrees
uvIndex	                number	        UV Index [0-10]
visibility	            number	        Visibility in meters
windDirection	        number	        Wind direction in degrees
windGust	            number	        Wind gust speed
windSpeed	            number	        Wind speed

Daily
Array containing daily forecast for the next 16 days. Each day contains:

[Array]	
Parameter	            Type	        Description
cloudCover              number	        Percentage of sky covered by clouds
forecastEnd	            number	        Unix timestamp for the end of this day
forecastStart	        number	        Unix timestamp for the start of this day
humidity	            number	        Relative humidity percentage
icon	                string	        Weather condition icon identifier
moonPhase	            number	        Moon phase (0-1)
precipIntensity	        number	        Precipitation intensity
precipProbability	    number	        Probability of precipitation percentage [0-1]
pressure	            number	        Sea-level air pressure
sunriseTime	            number	        Unix timestamp for sunrise
sunsetTime	            number	        Unix timestamp for sunset
uvIndexMax	            number	        Maximum UV Index for the day [0-10]
visibility	            number	        Visibility in meters
windDirectionAvg	    number	        Average wind direction in degrees
[parameter]Avg	        number	        Average value for the day (available for most parameters)
[parameter]Max	        number	        Maximum value for the day (available for most parameters)
[parameter]Min	        number	        Minimum value for the day (available for most parameters)

[parameter] includes apparentTemperature, dewPoint, temperature, windGust, windSpeed