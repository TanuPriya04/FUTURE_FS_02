import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastGrid from './components/ForecastGrid';
import ForecastChart from './components/ForecastChart';
import SavedCities from './components/SavedCities';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [savedCities, setSavedCities] = useState(() => {
    const stored = localStorage.getItem('savedCities');
    return stored ? JSON.parse(stored) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'metric');

  useEffect(() => {
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('unit', unit);
  }, [savedCities, darkMode, unit]);

  const fetchWeather = async (cityName) => {
    try {
      const weatherRes = await axios.get(`http://localhost:4000/api/weather?city=${cityName}&units=${unit}`);
      const forecastRes = await axios.get(`http://localhost:4000/api/forecast?city=${cityName}&units=${unit}`);
      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
      setError('');
      if (!savedCities.includes(cityName)) {
        setSavedCities([cityName, ...savedCities]);
      }
    } catch (err) {
      setError('City not found or API error');
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  const handleRemoveCity = (cityToRemove) => {
    setSavedCities(savedCities.filter((c) => c !== cityToRemove));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (city) fetchWeather(city); // Refresh data with new unit
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1>🌦️ Weather Dashboard</h1>
        <div className="top-buttons">
          <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button onClick={toggleUnit} className="unit-toggle">
            {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
          </button>
        </div>
      </header>
      <SearchBar onSearch={handleSearch} />
      <SavedCities cities={savedCities} onSelect={handleSearch} onRemove={handleRemoveCity} />
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard data={weatherData} unit={unit} />}
      {forecastData && <ForecastGrid data={forecastData} unit={unit} />}
      {forecastData && <ForecastChart data={forecastData} unit={unit} />}
    </div>
  );
}

export default App;