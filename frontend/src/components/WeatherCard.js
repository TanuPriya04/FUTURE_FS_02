import React from 'react';
import './WeatherCard.css';

function WeatherCard({ data }) {
  const { name, main, weather, wind } = data;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p><strong>{weather[0].main}</strong> - {weather[0].description}</p>
      <p>🌡️ Temp: {main.temp}°C</p>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>🌬️ Wind: {wind.speed} m/s</p>
      <p>🔽 Pressure: {main.pressure} hPa</p>
    </div>
  );
}

export default WeatherCard;
