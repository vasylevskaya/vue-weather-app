
export const getRealtimeWeatherByQuery = async (...queryItems) => {
if (!queryItems.length) return;

  const formatQuery = queryItems.join('%2C%20')
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${formatQuery}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '4571d05987msh8ed1ece060e12c6p132a7ajsn1f2635cbfc19',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/* Response Example
example = {
  "location": {
      "name": "Barcelona",
      "region": "Catalonia",
      "country": "Spain",
      "lat": 41.3833,
      "lon": 2.1833,
      "tz_id": "Europe/Madrid",
      "localtime_epoch": 1735166154,
      "localtime": "2024-12-25 23:35"
  },
  "current": {
      "last_updated_epoch": 1735165800,
      "last_updated": "2024-12-25 23:30",
      "temp_c": 13,
      "temp_f": 55.4,
      "is_day": 0,
      "condition": {
          "text": "Patchy rain nearby",
          "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
          "code": 1063
      },
      "wind_mph": 4.7,
      "wind_kph": 7.6,
      "wind_degree": 86,
      "wind_dir": "E",
      "pressure_mb": 1030,
      "pressure_in": 30.4,
      "precip_mm": 0.03,
      "precip_in": 0,
      "humidity": 83,
      "cloud": 98,
      "feelslike_c": 12.6,
      "feelslike_f": 54.7,
      "windchill_c": 12.6,
      "windchill_f": 54.7,
      "heatindex_c": 13,
      "heatindex_f": 55.4,
      "dewpoint_c": 10.2,
      "dewpoint_f": 50.3,
      "vis_km": 10,
      "vis_miles": 6,
      "uv": 0,
      "gust_mph": 6.4,
      "gust_kph": 10.2
  }}
 */
