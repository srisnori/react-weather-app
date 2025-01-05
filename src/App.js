import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  const apiKey = "c90ad9ef6039cc33e6e7bda653208946";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      );
      setTemperature(response.data.main.temp);
      setError("");
    } catch (err) {
      setError("City not found");
      setTemperature(null);
    }
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
          <h2>Current Temperature: {temperature}° {unit === "metric" ? "C" : "F"}</h2>
        </div>
      )}
    </div>
  );
}

export default App;