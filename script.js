var citiesList = $("#cities")
var cities = []
var cityName, forecastQueryURL, weatherData, currentWeatherIcon, currentWeatherIconEl, weathericon, currentTemp, weatherCard, cityDate, temp, humidity, windspeed, forecastQueryParams, fiveDayList;

function buildQueryUrl() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?";
    var queryParams = { "appid": "7a0417bb28fd390f6e702d0fcf1d9a1a" };
    queryParams.q = $("#search-term").val().trim();
    queryParams.units = "imperial"
    return queryURL + $.param(queryParams);
}
function buildForecastQueryUrl() {
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var forecastQueryParams = { "appid": "7a0417bb28fd390f6e702d0fcf1d9a1a" };
    forecastParams.id = data.id;
    forecastQueryParams.units = "imperial";
    return forecastQueryURL + $.param(forecastQueryParams);
}
init();
function buildQueryUrlHist() {
    var queryURLHist = "https://api.openweathermap.org/data/2.5/weather?";
    var queryParamsHist = { "appid": "0d2a570544db7d02e47387057bd868ca" };
    queryParamsHist.q = cityName;
    queryParamsHist.units = "imperial"
    return queryURLHist + $.param(queryParamsHist);
};
function init() {
    $("#cities").empty();
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCities();
}
function buildCurrentWeatherCardHist() {
    $(weatherCard).append(cityDate);
    $(weatherCard).append(weathericon)
    $(weatherCard).append(temp);
    $(weatherCard).append(humidity);
    $(weatherCard).append(windspeed);
    $("#current-day-forecast").append(weatherCard);
};

$(".search-button").on("click", function (event) {
    event.preventDefault();
    $("#current-day-forecast").empty();
    $("#five-day-forecast").empty();
    var searchHistory = $("#search-term").val().trim();
    if (searchHistory === "") {
        return;
    };
    cities.push(searchHistory)
    localStorage.setItem("cities", JSON.stringify(cities));
    queryURL = buildQueryUrl();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        function buildCurrentWeatherCard() {
            $(weatherCard).append(cityDate);
            $(weatherCard).append(weathericon)
            $(weatherCard).append(temp);
            $(weatherCard).append(humidity);
            $(weatherCard).append(windspeed);
            $("#current-day-forecast").append(weatherCard);
        }
        var date = moment().format("MMM Do YY");
        var weatherData = data;
        var currentWeatherIcon = data.weather[0].icon;
        var currentWeatherIconEl = "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
        var weathericon = $("<img/>", {
            id: "weather-icon",
            src: currentWeatherIconEl,
            width: 80
        });
        var currentTemp = Math.floor(weatherData.main.temp);
        var weatherCard = $("<div>").addClass("card weather-card current-day-weather");
        var cityDate = $("<h5>").addClass("card-title").text(weatherData.name + " " + "(" + date + ")");
        var temp = $("<p>").addClass("card-text").text("Temp: " + currentTemp + " F");
        var humidity = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + weatherData.main.humidity + " %");
        var windspeed = $("<p>").addClass("card-text").text("Windspeed: " + weatherData.wind.speed + " mph");
        buildCurrentWeatherCard();
        function buildForecastQueryUrl() {
            var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
            var forecastQueryParams = { "appid": "7a0417bb28fd390f6e702d0fcf1d9a1a" };
            forecastQueryParams.id = data.id;
            forecastQueryParams.units = "imperial";
            return forecastQueryURL + $.param(forecastQueryParams);
        }