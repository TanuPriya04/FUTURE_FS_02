import React from 'react';
import './SavedCities.css';

function SavedCities({ cities, onSelect, onRemove }) {
  return (
    <div className="saved-cities">
      <h3>⭐ Saved Cities</h3>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            <button onClick={() => onSelect(city)}>{city}</button>
            <span onClick={() => onRemove(city)}>✖</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedCities;