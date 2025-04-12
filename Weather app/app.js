const apiKey = "d3645d78deb9d10ca28385b9af0c0d44";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city)); // ❌ Removed: origin: "cros" (not valid in fetch)
    const respData = await resp.json();

    if (respData.cod === 200) {
      addWeatherToPage(respData);
    } else {
      showError(respData.message);
    }
  } catch (error) {
    showError("Something went wrong.");
    console.error(error);
  }
}

function addWeatherToPage(data) {
  const temp = Ktoc(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      ${temp}°C
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </h2>
    <small>${data.weather[0].main}</small>
  `;

  // Clear previous weather and append new
  main.innerHTML = "";
  main.appendChild(weather);
}

function showError(message) {
  main.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value.trim();

  if (city) {
    getWeatherByLocation(city);
  }
});
