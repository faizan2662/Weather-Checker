import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const fetchWeather = async (city) => {
    try {
      setError(false); // Reset error state
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e483d59a62de31444701653495d50225`
      );
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setWeatherData(null);
      setError(true);
    }
  };

  return (
    <div className="app">
      <h1>Weather Checker</h1>
      <WeatherForm onCityChange={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} error={error} />
    </div>
  );
};

export default App;