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