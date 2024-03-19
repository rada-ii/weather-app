// src/components/DailyForecast.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const DailyForecast = ({ weatherData }) => {
  const [dailyForecast, setDailyForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}`
        );
        setDailyForecast(response.data.daily);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchDailyForecast();
  }, [weatherData]);

  if (loading) return <p>Loading daily forecast...</p>;
  if (error) return <p>Error fetching daily forecast: {error}</p>;
  if (!dailyForecast) return null;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Daily Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dailyForecast.map((day, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <p className="font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>
            <p>Temperature: {day.temp.day} K</p>
            <p>Description: {day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
