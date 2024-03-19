import React from "react";

const Geolocation = ({ setCity }) => {
  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchCityName(latitude, longitude);
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setCity(data.name);
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
  };

  return (
    <button
      onClick={handleGeolocation}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Use My Location
    </button>
  );
};

export default Geolocation;
