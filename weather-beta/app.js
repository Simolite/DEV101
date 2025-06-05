const get = document.querySelector('button');
const add = document.querySelector('.addbtn');
const key = 'a26c24e25487ba0faaf1d58d595bda69';
let citys = [];
const card = document.getElementById('weatherCard');
let city = 'paris';
let unit = 'metric';
let symbol = 'C';

function saveCitiesToStorage() {
    localStorage.setItem('customCities', JSON.stringify(citys));
}

function loadCitiesFromStorage() {
    const stored = localStorage.getItem('customCities');
    if (stored) {
        citys = JSON.parse(stored);
    } else {
        citys = ['Oujda','Fes','Tanger','Taza',"Tokyo", "Paris", "New York", "London", "Barcelona","Sydney", "Dubai", "Rome", "Istanbul", "Bangkok","Toronto", "Los Angeles", "Singapore", "Berlin", "Moscow","Madrid", "Lisbon", "Seoul", "Mexico City", "Buenos Aires","Jakarta", "Cairo", "Cape Town", "Athens", "Prague"];
    }
}

async function getweather() {
    city = document.querySelector('select').value;
    unit = document.querySelector('input[name="unit"]:checked').value;
    screen.value = "Fetching weather...";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=${unit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.main) {
            screen.value = "City not found.";
            return false;
        }

        symbol = unit !== 'metric' ? 'F' : 'C';
        const flagURL = `https://flagsapi.com/${data.sys.country}/flat/64.png`;
        document.querySelector('.card').style.display = 'block';
        document.getElementById('flag').src = flagURL;
        document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
        document.getElementById('temp').innerText = `Temperature: ${data.main.temp}°${symbol}`;
        document.getElementById('feels-like').innerText = `Feels Like: ${data.main.feels_like}°${symbol}`;
        document.getElementById('min-max').innerText = `Min: ${data.main.temp_min}°, Max: ${data.main.temp_max}°`;
        document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById('pressure').innerText = `Pressure: ${data.main.pressure} hPa`;
        document.getElementById('wind').innerText = `Wind: ${data.wind.speed} m/s, Direction: ${data.wind.deg}°`;
        document.getElementById('visibility').innerText = `Visibility: ${data.visibility} m`;
        document.getElementById('clouds').innerText = `Cloudiness: ${data.clouds.all}%`;
        document.getElementById('sunrise').innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
        document.getElementById('sunset').innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

        screen.style.backgroundColor = 'grey';
        setTimeout(() => {
            screen.style.backgroundColor = '#ccc';
        }, 3000);

        return true;

    } catch (error) {
        console.error(error);
        screen.value = "Error fetching data.";
        return false;
    }
}

async function addcity() {
    let city = document.getElementById('add').value.trim();
    let exists = citys.some(c => c.toLowerCase() === city.toLowerCase());
    if (exists) {
        alert('City already exists');
        return;
    }
    const valid = await getweather(city, unit);
    if (valid) {
        let list = document.querySelector('select');
        let option = document.createElement('option');
        option.value = city;
        option.innerText = city;
        list.appendChild(option);
        citys.push(city);
        saveCitiesToStorage();
    } else {
        alert('Invalid city');
    }
    document.getElementById('add').value = '';
}

get.addEventListener('click', () => {
    getweather();
});
add.addEventListener('click', () => {
    addcity();
});
loadCitiesFromStorage();
let select = document.querySelector('select');
citys.forEach(element => {
    let option = document.createElement('option');
    option.value = element;
    option.innerText = element;
    select.appendChild(option);
});
document.querySelector('.card').style.display = 'none';