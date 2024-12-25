import React, { useState } from 'react';
import './WeatherForm.css';

const WeatherForm = ({ onCityChange }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
                {
                    headers: {
                        'X-RapidAPI-Key': '008c778cf2msh49b1bc614bc4208p19197ejsnc6ef61adea31',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                    },
                }
            );
            const data = await response.json();
            setSuggestions(data.data || []);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        fetchSuggestions(value);
    };

    const handleSuggestionClick = (city) => {
        setInput(city);
        setSuggestions([]);
        onCityChange(city);
    };

    return (
        <div className="weather-form">
            <input
                type="text"
                placeholder="Enter city"
                value={input}
                onChange={handleInputChange}
                className="search-bar"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleSuggestionClick(city.name)}
                        >
                            {city.name}, {city.countryCode}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => onCityChange(input)}>Get Weather</button>
        </div>
    );
};

export default WeatherForm;