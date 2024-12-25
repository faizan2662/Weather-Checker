import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, error }) => {
  if (error) {
    return <div className="weather-display">No city found. Please try again.</div>;
  }

  if (!weatherData) {
    return <div className="weather-display">Enter a city to see the weather.</div>;
  }

  return (
    <div className="weather-display">
      <h2>Weather in {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherDisplay;