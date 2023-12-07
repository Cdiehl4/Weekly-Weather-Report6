var apiKey = "a803d2fda885df1d6a1e1e2ab3ee05f1"



function getWeather(){
    var cityName = "London"
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey
    fetch(geoUrl) 
}


var cityTxt = document.getElementById('cityInput');
var searchButton = document.getElementById('searchBtn')
var actualDay = document.querySelector('.currentDay');
var forcasts = document.querySelector('.fiveDayForcast');
var searchedCity = document.getElementById('previousCities');

document.addEventListener('DOMContentLoaded', () => {
    var cities = JSON.parse(localStorage.getItem('searchedCities'))|| [];
    for (var index = 0; index < cities.length; index++) {
        createBtn(cities[index]);
    }
 })

 function createBtn(name) {
    const element = document.createElement('button');
        element.textContent = name;
        element.classList.add('typedCity');
        searchedCity.append(element);
 }

function getCoordinates(coordinateApi) {
    fetch(coordinateApi)
        .then((response) => {
    
            return response.json();
        })
        .then((response) => {
            console.log(response);
            actualWeather(response.coord.lat,response.coord.lon)
            currentWeather(response);
            // get current weather and create a separate function
        });
        
    }

    function currentWeather(weather){
     actualDay.textContent = '';
    var searchName = weather.name;
    var temp = weather.main.temp;
    var date = weather.dt;
    var iconurl = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
    var humidity = weather.main.humidity;
    var wind = weather.wind.speed;
    var container = document.createElement('div')
    var cityName = document.createElement('div')
    cityName.textContent ='City:' + ' ' + searchName;
    var temperature = document.createElement('div')
    temperature.textContent = 'Temperature:' + ' ' + temp;
    var currentDate = document.createElement('div')
    currentDate.textContent = new Date(date*1000).toLocaleDateString('en-US');
    var windSpeed = document.createElement('div')
    windSpeed.textContent = 'Wind:' + ' ' + wind;
    var humidityDeg = document.createElement('div')
    humidityDeg.textContent = 'Humidity:' + ' ' + humidity;
    var emoji = document.createElement('img')
    emoji.src = iconurl;
    
    container.append(cityName,currentDate,emoji,temperature,windSpeed,humidityDeg);
    
    actualDay.append(container);
    actualDay.style.display = 'flex';
    }

    function showforecast (forcastArray){
        forcasts.textContent = '';
        for (let index = 8; index < forcastArray.length; index+=8) {
            const element = forcastArray[index];
            console.log(element);
            var temp = element.main.temp;
            var date = element.dt;
            var iconurl = "http://openweathermap.org/img/w/" + element.weather[0].icon + ".png";
            var humidity = element.main.humidity;
            var wind = element.wind.speed;
            var container = document.createElement('div')
            var temperature = document.createElement('div')
            temperature.textContent = 'Temperature:' + ' ' + temp;
            var currentDate = document.createElement('div')
            currentDate.textContent = new Date(date*1000).toLocaleDateString('en-US');
            var windSpeed = document.createElement('div')
            windSpeed.textContent = 'Wind:' + ' ' + wind;
            var humidityDeg = document.createElement('div')
            humidityDeg.textContent = 'Humidity:' + ' ' + humidity;
            var emoji = document.createElement('img')
            emoji.src = iconurl;
            
            container.append(currentDate,emoji,temperature,windSpeed,humidityDeg);
            
            forcasts.append(container);
        }
    }
    searchButton.addEventListener('click', function () {
        var textInput = cityTxt.value
        var cities = JSON.parse(localStorage.getItem('searchedCities'))|| [];
        var previousCityBtns = document.getElementsByClassName('typedCity');
        console.log(previousCityBtns);
        
        if (previousCityBtns.length >= 5){
            previousCityBtns[0].remove();
            cities.shift();
        }
        
        createBtn(textInput);
        cities.push(textInput);
        localStorage.setItem('searchedCities',JSON.stringify(cities))
        var coordinateApi = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${apiKEY}&units=imperial`;
        getCoordinates(coordinateApi);
        
    });
    
    
    // add an eventlistener to all the prev city buttons that display the weather data for each of those cities. 
    
    searchedCity.addEventListener('click', function(event){
        cityTxt.value = '';
        if(event.target.classList.contains('typedCity')) {
            getCoordinates(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.innerHTML}&appid=${apiKEY}&units=imperial`);
            
        }
    })