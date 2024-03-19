// src/components/HourlyForecast.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const HourlyForecast = ({ weatherData }) => {
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude=current,minutely,daily,alerts&appid=${process.env.REACT_APP_API_KEY}`
        );
        setHourlyForecast(response.data.hourly);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchHourlyForecast();
  }, [weatherData]);

  if (loading) return <p>Loading hourly forecast...</p>;
  if (error) return <p>Error fetching hourly forecast: {error}</p>;
  if (!hourlyForecast) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Hourly Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <p className="font-semibold">
              {new Date(hour.dt * 1000).toLocaleTimeString("en-US")}
            </p>
            <p>Temperature: {hour.temp} K</p>
            <p>Description: {hour.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
