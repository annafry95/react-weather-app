import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import "./styles.css";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);

  function displayForecast(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="weather-app">
      <form onSubmit={handleSubmit} id="search-form">
        <input
          type="search"
          placeholder="Enter a city.."
          required
          className="search-input"
          id="search-input"
          onChange={updateCity}
        />
        <input type="submit" value="Search" className="search-button" />
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div className="weather-app">
        {form}

        <main>
          <div className="current-weather">
            <div>
              <h1 className="current-city" id="current-city">
                {city}
              </h1>
              <p className="current-details">
                {weather.description} <br />
                Humidity: <strong>{weather.humidity}%</strong>, Wind:{" "}
                <strong>{weather.wind}km/h</strong>
              </p>
            </div>
            <div className="current-temperature">
              <span className="current-temperature-icon">
                <img src={weather.icon} alt="{weather.description}" />
              </span>
              <span className="current-temperature-value">
                {Math.round(weather.temperature)}
              </span>
              <span className="current-temperature-unit">°C</span>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return form;
  }
}
