const apiKey = "f8f714e530f399be26cdb6610b4036fa";

async function getWeather() {
  const city = document.getElementById("city-input").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const hourlyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("City not found");
    
    const weatherData = await response.json();
    displayWeather(weatherData);

    const hourlyResponse = await fetch(hourlyUrl);
    const hourlyData = await hourlyResponse.json();
    displayHourlyForecast(hourlyData);
  } catch (error) {
    alert("Error retrieving weather data. Please try again.");
  }
}

function displayWeather(data) {
  document.getElementById("city-name").innerText = data.name;
  document.getElementById("description").innerText = data.weather[0].description;
  document.getElementById("temp").innerText = data.main.temp;
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind-speed").innerText = data.wind.speed;

  document.getElementById("sunrise").innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  document.getElementById("sunset").innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

function displayHourlyForecast(data) {
  const forecastContainer = document.getElementById("hourly-forecast");
  forecastContainer.innerHTML = ""; 

  data.list.slice(0, 5).forEach((hour) => {
    const hourCard = document.createElement("div");
    hourCard.className = "hour-card";
    
    const time = document.createElement("p");
    time.innerText = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    hourCard.appendChild(time);

    const temp = document.createElement("p");
    temp.innerText = `${hour.main.temp}°C`;
    hourCard.appendChild(temp);

    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;
    hourCard.appendChild(icon);

    forecastContainer.appendChild(hourCard);
  });
}
