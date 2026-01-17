import bgImage from './assets/images/background.avif';
import { getWeather } from './api.js';

// Background image setup
document.body.style.backgroundImage = `url(${bgImage})`;

function forecastItem(day) {
  const icon = day.icon;
  const date = new Date(day.datetime).toLocaleDateString();
  return `
    <div class="forecast-item">
      <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${icon}.png" alt="icono clima">
      <div class="forecast-date">${date}</div>
      <div class="forecast-temp">${day.tempmin}° / ${day.tempmax}°</div>
      <div class="forecast-desc">${day.conditions}</div>
    </div>
  `;
}

function drawWeatherGrid(data) {
  if (!data || !data.currentConditions) {
    document.querySelector('.weather-display').innerHTML =
      '<div>Error fetching data</div>';
    return;
  }

  const iconWeather = data.currentConditions.icon;
  const temp = data.currentConditions.temp;

  document.querySelector('.weather-main').innerHTML = `
  <img class="weather-icon" src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${iconWeather}.png" alt="weather icon">
  <span class="weather-temp">${temp}°</span>
`;

  const location = data.resolvedAddress;
  const localTime = new Date(data.currentConditions.datetimeEpoch * 1000);
  document.querySelector('.location-info').innerHTML = `
    <strong>${location}</strong><br>
    ${localTime.toLocaleDateString()} ${localTime.toLocaleTimeString()}
  `;

  document.querySelector(
    '.weather-description'
  ).textContent = `Description: ${data.description}`;

  document.querySelector(
    '.humidity'
  ).textContent = `Humidity: ${data.currentConditions.humidity}%`;

  document.querySelector(
    '.wind'
  ).textContent = `Wind Speed: ${data.currentConditions.windspeed} km/h`;

  const forecastDays = data.days.slice(1, 6);
  document.querySelector('.forecast').innerHTML = `
    <strong>Next 5 days:</strong>
    <div class="forecast-grid">
      ${forecastDays.map(forecastItem).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const weatherForm = document.querySelector('.weather-form');
  const locationInput = document.querySelector('#location-input');
  const tempToggle = document.getElementById('temp-toggle');
  let currentLocation = '';
  let currentUnit = 'metric';

  function fetchAndRenderWeather(location, unit) {
    document.querySelector('.result-container').classList.remove('hidden');
    document.getElementById('loading').classList.remove('hidden');
    getWeather(location, unit).then((data) => {
      document.getElementById('loading').classList.add('hidden');
      drawWeatherGrid(data);
    });
  }

  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
      currentLocation = location;
      fetchAndRenderWeather(location, currentUnit);
      getWeather(location, currentUnit).then((data) => console.log(data));
    }
  });

  tempToggle.addEventListener('change', () => {
    currentUnit = tempToggle.checked ? 'imperial' : 'metric';
    if (currentLocation) {
      fetchAndRenderWeather(currentLocation, currentUnit);
    }
  });
});
