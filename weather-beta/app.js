const get = document.querySelector('button');
const add = document.querySelector('.addbtn');
const clear = document.querySelector('.clearbtn');
const dell = document.querySelector('.delbtn');
const key = 'a26c24e25487ba0faaf1d58d595bda69';
let citys = [];
const card = document.getElementById('weatherCard');
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

async function getweather(city) {
    screen.value = "Fetching weather...";
    let unit = document.querySelector('input[name="unit"]:checked').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=${unit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.main) {
            return false;
        }

        symbol = unit !== 'metric' ? 'F' : 'C';
        const flagURL = `https://flagsapi.com/${data.sys.country}/flat/64.png`;
        const icon = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
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
        document.querySelector('select').value = city;
        document.getElementById('weather-icon').src = iconURL;       
        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
}

async function addcity(city) {
    if (!document.getElementById('add').value){alert('please enter the city name you want to add ');return}
    let exists = citys.some(c => c.toLowerCase() === city.toLowerCase());
    if (exists) {
        let answer = prompt('The city already exists. If you are trying to delete it, type anything and press OK, Otherwise, press Cancel."');
        if(!answer){document.getElementById('add').value = '';return}
        dellcity(city);
        return;
    }
    const valid = await getweather(city);
    if (valid) {
        citys.push(city);
        saveCitiesToStorage();
        loader();
        document.querySelector('select').value = city;
        document.querySelector('.card').style.display = 'block';
    } else {
        alert('Invalid city');
    }
    document.getElementById('add').value = '';
}
function loader(){
    loadCitiesFromStorage();
    let select = document.querySelector('select');
    select.innerHTML='';
    citys.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.innerText = element;
        select.appendChild(option);
    });
    document.querySelector('.card').style.display = 'none';
}

function dellcity(city){
    if(!city){
        alert('please enter a city name !');
        return;
    }
    const initialLength = citys.length;
    citys = citys.filter(c => c.toLowerCase()!=city.toLowerCase());
    saveCitiesToStorage();
    loader();
    if(initialLength==citys.length){
        let answer = prompt("The city you want to delete was not found in the list. If you are trying to add it instead, type anything and press OK. Otherwise, press Cancel.");
        if(!answer){document.getElementById('add').value = '';return}
        addcity(city);
    }else{alert('The city '+city+' deleted with succes')};
    document.getElementById('add').value = '';
}
get.addEventListener('click', () => {
    let city = document.querySelector('select').value;
    getweather(city);
});
add.addEventListener('click', () => {
    let city = document.getElementById('add').value.trim();
    addcity(city);
});
clear.addEventListener('click',() => {
    localStorage.removeItem('customCities');
    loader();
});
dell.addEventListener('click',() => {
    let city = document.getElementById('add').value.trim();
    dellcity(city);
});
loader();