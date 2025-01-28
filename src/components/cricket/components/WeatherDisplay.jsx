import React, { useState, useEffect } from 'react';

const WeatherDisplay = ({ weatherData }) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  
  useEffect(() => {
    // Rotate display every 10 seconds
    const interval = setInterval(() => {
      setDisplayIndex((prev) => (prev + 1) % 10); // Now rotating through 10 states (removed pressure)
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Return null if no weather data
  if (!weatherData || !weatherData.main) return null;

  // Convert wind speed from m/s to km/h
  const windSpeedKmh = Math.round(weatherData.wind.speed * 3.6);

  // Convert visibility from meters to kilometers
  const visibilityKm = Math.round(weatherData.visibility / 1000);

  // Convert Unix timestamps to local time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // All possible weather displays
  const weatherInfo = [
    // City name
    {
      icon: "📍",
      text: `${weatherData.name}, ${weatherData.sys.country}`
    },
    // Weather condition
    {
      icon: weatherData.weather[0]?.main === "Clear" ? "☀️" :
            weatherData.weather[0]?.main === "Rain" ? "🌧️" :
            weatherData.weather[0]?.main === "Clouds" ? "☁️" :
            weatherData.weather[0]?.main === "Snow" ? "❄️" : "🌤️",
      text: `${weatherData.weather[0]?.main?.toUpperCase()}`
    },
    // Current temperature
    {
      icon: "🌡️",
      text: `TEMP ${Math.round(weatherData.main.temp)}°C`
    },
    // Feels like
    {
      icon: "🌡️",
      text: `FEELS ${Math.round(weatherData.main.feels_like)}°C`
    },
    // Temperature range
    {
      icon: "🌤️",
      text: `RANGE ${Math.round(weatherData.main.temp_min)}°-${Math.round(weatherData.main.temp_max)}°C`
    },
    // Wind info
    {
      icon: "💨",
      text: `WIND ${windSpeedKmh}km/h ${weatherData.wind.deg}°`
    },
    // Humidity
    {
      icon: "💧",
      text: `HUMIDITY ${weatherData.main.humidity}%`
    },
    // Visibility
    {
      icon: "👁️",
      text: `VISIBILITY ${visibilityKm}km`
    },
    // Cloudiness
    {
      icon: "☁️",
      text: `CLOUDS ${weatherData.clouds.all}%`
    },
    // Sunrise/Sunset
    {
      icon: "🌅",
      text: `SUN ${formatTime(weatherData.sys.sunrise)}-${formatTime(weatherData.sys.sunset)}`
    }
  ];

  // Get current display info
  const currentWeather = weatherInfo[displayIndex];

  return (
    <span className="text-4xl font-bold whitespace-nowrap flex items-center gap-3">
      <span className="text-blue-400/80">{currentWeather.icon}</span>
      {currentWeather.text}
    </span>
  );
};

export default WeatherDisplay; 