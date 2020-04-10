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