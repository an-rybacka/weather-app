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
  return `Last update:
   ${day}, ${hour}:${minutes}`;
}

let dateElement = document.querySelector("#currentTime");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

// FUNCTION Display forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", ];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="day-card card col">
            <div class="card-body">
              <p class="day">${day}</p>
              <br />
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt=""
                class="icon-forecast"
                width="42"
              />
              <br />
              <p class="temp">
                <span class="max-temp">5°C </span
                ><span class="min-temp"> | 5°C </span>
              </p>
              <br />
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

// FUNCTION Display searched weather

function showWeather(response) {
  document.querySelector("#h1city").innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  let description = document.querySelector("#clouds");
  description.innerHTML = response.data.weather[0].description;

  let todayPrecipitation = response.data.main.humidity;
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = `Humidity: ${todayPrecipitation}%`;

  let todayWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${todayWind} km/h`;

  let iconElement = document.querySelector("#icon-today");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

let LocationButton = document.querySelector("#button-location");
LocationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

displayForecast();

search("Zurich");
