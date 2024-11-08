const apiKey = "b060bd60f47b434cb25ee9b49f6a3476";  // Replace with your actual API key
const baseURL = "https://api.weatherbit.io/v2.0/forecast/hourly";

async function getWeather() {
  const city = document.getElementById("city-input").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `${baseURL}?city=${city}&key=${apiKey}&hours=24`; // Get 24-hour forecast

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayCurrentWeather(data.data[0]);
    displayHourlyForecast(data);
  } catch (error) {
    alert("Error retrieving weather data. Please try again.");
  }
}

function displayCurrentWeather(current) {
  const currentContainer = document.getElementById("current-weather");
  currentContainer.innerHTML = `
    <h2>Current Weather</h2>
    <p>Temperature: ${current.temp}°C</p>
    <p>Humidity: ${current.rh}%</p>
    <p>Wind Speed: ${current.wind_spd} m/s</p>
    <img src="https://www.weatherbit.io/static/img/icons/${current.weather.icon}.png" alt="${current.weather.description}">
    <p>${current.weather.description}</p>
  `;
}

function displayHourlyForecast(data) {
  const forecastContainer = document.getElementById("hourly-forecast");
  forecastContainer.innerHTML = "<h2>24-Hour Forecast</h2>";

  data.data.forEach((hour) => {
    const hourCard = document.createElement("div");
    hourCard.className = "hour-card";

    const time = document.createElement("p");
    time.innerText = new Date(hour.timestamp_local).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    hourCard.appendChild(time);

    const temp = document.createElement("p");
    temp.innerText = `${hour.temp}°C`;
    hourCard.appendChild(temp);

    const icon = document.createElement("img");
    icon.src = `https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`;
    icon.alt = hour.weather.description;
    hourCard.appendChild(icon);

    forecastContainer.appendChild(hourCard);
  });
}

document.getElementById("fetch-weather-btn").addEventListener("click", getWeather);
