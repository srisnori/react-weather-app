import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState("");
  const [precipitation, setPrecipitation] = useState("");
  const [wind, setWind] = useState("");
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  const apiKey = "c90ad9ef6039cc33e6e7bda653208946";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric` // Always fetch in Celsius
      );
      setTemperature(response.data.main.temp);
      setHumidity(response.data.main.humidity);

      const precipitationData = response.data.rain ? response.data.rain["1h"] : 0; // 1h is for 1 hour precipitation
      setPrecipitation(precipitationData);
      setWind(response.data.wind.speed);

      setError("");
    } catch (err) {
      setError("City not found");
      setTemperature(null);
      setHumidity(null);
      setPrecipitation(null);
      setWind(null);
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  // Convert Celsius to Fahrenheit
  const convertTemperature = (temp, unit) => {
    if (unit === "imperial") {
      return (temp * 9) / 5 + 32; 
    }
    return temp; 
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Temperature</button>

      {error && <p>{error}</p>}
      {temperature !== null && (
          <div>
            <h2>
              Temperature: {convertTemperature(temperature, unit)}°{" "}
              {unit === "metric" ? "C" : "F"}
              <div>
          <button
            onClick={() => handleUnitChange("metric")}
            disabled={unit === "metric"}
          >
            Celsius (°C)
          </button>
          <button
            onClick={() => handleUnitChange("imperial")}
            disabled={unit === "imperial"}
          >
            Fahrenheit (°F)
          </button>
        
        
        </div>
          </h2>
          <h2>Humidity: {humidity}%</h2>
          <h2>Precipitation: {precipitation}%</h2>
          <h2>Wind: {wind} km/h</h2>
        </div>
      )}
    </div>
  );
}

export default App;
