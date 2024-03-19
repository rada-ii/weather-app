// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Geolocation from "./components/Geolocation";
import SearchByLocation from "./components/SearchByLocation";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherByCity = async (city) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
        );
        setWeatherData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    if (city) {
      fetchWeatherByCity(city);
    }
  }, [city]);

  const handleSearch = (city) => {
    setCity(city);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <Geolocation setCity={setCity} />
      <SearchByLocation handleSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <>
          <DailyForecast weatherData={weatherData} />
          <HourlyForecast weatherData={weatherData} />
        </>
      )}
    </div>
  );
}

export default App;
