// Display current time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  // Add a leading zero to the hour and minutes if they are less than 10
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hour}:${minutes}`;
}

let dateElement = document.querySelector("#currentTime");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

// FUNCTION Display searched weather

function showWeather(response) {
  document.querySelector("#h1city").innerHTML = response.data.name;

  let todayTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${todayTemp}`;

  let todaySky = response.data.weather[0].description;
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `${todaySky}`;

  let todayPrecipitation = response.data.main.humidity;
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = `Humidity: ${todayPrecipitation}%`;

  let todayWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${todayWind} km/h`;
}

function showCity(event) {
  // Display the searched city in the heading
  event.preventDefault();
  let searchedCity = document.querySelector("#search").value;
  let h1city = document.querySelector("#h1city");
  h1city.innerHTML = `${searchedCity}`;
  search(searchedCity);
}

function search(searchedCity) {
  let apiKey = "e3058a56f616984b73a56e123ec98b36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

// Search Current Location
function searchLocation(position) {
  let apiKey = "e3058a56f616984b73a56e123ec98b36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);

  let h1city = document.querySelector("#h1city");
  h1city.innerHTML = position.data.name;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showCity);
search("Zurich");

let LocationButton = document.querySelector("#button-location");
LocationButton.addEventListener("click", getCurrentLocation);
