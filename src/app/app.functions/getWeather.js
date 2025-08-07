const axios = require("axios");

exports.main = async (context, callback) => {
  const { city } = context.parameters;
  const { OPENWEATHER_API_KEY } = process.env;
  const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5"
  
  if (!city) {
    return {
      statusCode: 400,
      body: { message: "City parameter is missing." }
    };
  }

  try {
    const url = `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: response.data
    };
  } catch (error) {
    console.log("Error fetching weather data:", error);
    console.error("Error fetching weather from OpenWeatherMap:", error.message);
    let errorMessage = "Failed to fetch weather data.";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    return {
      statusCode: error.response ? error.response.status : 500,
      body: { message: errorMessage, cod: error.response ? error.response.status : 500 }
    };
  }
};