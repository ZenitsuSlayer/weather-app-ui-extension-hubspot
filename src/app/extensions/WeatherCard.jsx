import { useState, useCallback } from "react";
import {
  Button,
  Text,
  Input,
  Flex,
  hubspot,
  Icon,
  LoadingSpinner,
  Box,
} from "@hubspot/ui-extensions";

hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <WeatherCard
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

const WeatherCard = ({ runServerless, sendAlert }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = useCallback((value) => setCity(value), []);

  const fetchWeather = useCallback(async () => {
    if (!city.trim()) {
      sendAlert({ message: "Please enter a city name.", type: "danger" });
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const { response } = await runServerless({
        name: "getWeather",
        parameters: { city: city.trim() },
      });

      if (response?.body?.cod === 200) {
        setWeatherData(response.body);
        sendAlert({
          message: `Weather data fetched successfully for ${city.trim()}!`,
          type: "success",
        });
      } else {
        const errorMessage =
          response?.body?.message || "Failed to fetch weather data. Please try again.";
        setError(errorMessage);
        sendAlert({ message: `Error: ${errorMessage}`, type: "danger" });
      }
    } catch (e) {
      setError("An unexpected error occurred. Please check console for details.");
      sendAlert({ message: "An unexpected error occurred.", type: "danger" });
    } finally {
      setLoading(false);
    }
  }, [city, runServerless, sendAlert]);

  const renderWeatherInfo = () => {
    if (!weatherData) return null;

    const { name, sys, main, weather, wind } = weatherData;

    return (
      <Box
        padding="medium"
        marginTop="medium"
        borderRadius="medium"
        backgroundColor="surface-default"
      >
        <Flex direction="column" gap="x-small">
          <Text format={{ fontWeight: "bold", fontSize: "md" }}>
            Weather in {name}, {sys.country}
          </Text>
          <Text>
            Temperature: {Math.round(main.temp)}°C (Feels like:{" "}
            {Math.round(main.feels_like)}°C)
          </Text>
          <Text>
            Condition:{" "}
            {weather[0].description.charAt(0).toUpperCase() +
              weather[0].description.slice(1)}
          </Text>
          <Text>Humidity: {main.humidity}%</Text>
          <Text>Wind Speed: {wind.speed} m/s</Text>
        </Flex>
      </Box>
    );
  };

  return (
    <Flex direction="column" gap="medium">
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          Local Weather for Contact <Icon name="location" />
        </Text>{" "}
        Enter a city to get the current weather conditions. This can help you
        personalize your outreach!
      </Text>

      <Flex
        as="form"
        direction="row"
        align="end"
        gap="small"
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}
      >
        <Input
          name="city"
          label="City"
          placeholder="e.g., London, New York"
          onInput={handleInput}
          value={city}
          required
        />
        <Button type="submit" onClick={fetchWeather} loading={loading} disabled={loading}>
          {loading ? "Fetching..." : "Get Weather"}
        </Button>
      </Flex>

      {loading && (
        <Flex
          justify="center"
          align="center"
          direction="column"
          gap="small"
          marginTop="medium"
        >
          <LoadingSpinner size="lg" />
          <Text>Loading weather data...</Text>
        </Flex>
      )}

      {error && (
        <Text format={{ color: "danger" }} marginTop="small">
          Error: {error}
        </Text>
      )}

      {!loading && renderWeatherInfo()}
    </Flex>
  );
};
