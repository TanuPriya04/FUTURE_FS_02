import React from 'react';
import './ForecastGrid.css';

function ForecastGrid({ data }) {
  const dailyForecasts = data.list.filter((_, index) => index % 8 === 0);

  return (
    <div className="forecast-grid">
      {dailyForecasts.map((item, index) => (
        <div className="forecast-item" key={index}>
          <h4>{new Date(item.dt_txt).toLocaleDateString()}</h4>
          <p>{item.weather[0].main}</p>
          <p>🌡️ {item.main.temp}°C</p>
          <p>💧 {item.main.humidity}%</p>
        </div>
      ))}
    </div>
  );
}

export default ForecastGrid;