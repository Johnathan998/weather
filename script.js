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
        forecastQueryURL = buildForecastQueryUrl();
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (fiveData) {
            fiveDayList = fiveData.list;
            for (var i = 4; i < fiveDayList.length; i += 8) {
                var day = fiveDayList[i];
                var dayIcon = day.weather[0].icon;
                var dayWeatherIcon = "https://openweathermap.org/img/wn/" + dayIcon + ".png";
                var dayIconEl = $("<img/>", {
                    id: "weather-icon",
                    src: dayWeatherIcon,
                    width: 50
                })
                var dayTempEl = Math.floor(day.main.temp);
                var dayCard = $("<div>").addClass("card weather-card col-lg bg-primary text-white mr-md-2 mb-3");
                var dayDate = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text(moment().add(1, 'days').format('L'));
                var dayTemp = $("<p>").addClass("card-text").text("Temp: " + dayTempEl + " F");
                var dayHum = $("<p>").addClass("card-text text-nowrap").text("Humidity: " + day.main.humidity);
                $(dayCard).append(dayDate);
                $(dayCard).append(dayIconEl)
                $(dayCard).append(dayTemp);
                $(dayCard).append(dayHum);
                $("#five-day-forecast").append(dayCard);
            }
        })
        var uvIndex;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=0d2a570544db7d02e47387057bd868ca"
        buildCurrentWeatherCard();
        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            uvIndex = response.value
            uvIndexTag = $("<p>").text("UV Index: " + uvIndex)
            $(".current-day-weather").append(uvIndexTag)
        })
        $("#search-term").val(null)
        init();
    });

    function renderCities() {
        if (cities.length > 5) {
            cities.shift();
        }

        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            var li = $("<li>")
            var button = $("<button>");
            button.text(city);
            button.attr("data-index", i);
            button.attr("style", "width: 100%")
            button.addClass("btn shadow-box btn-primary hist-button");
            li.append(button);
            $("#cities").prepend(li);
            $("#cities").prepend("<br>");
        }
    }

    $("#cities").on("click", "button", function () {
        $("#current-day-forecast").empty();
        $("#five-day-forecast").empty();
        cityName = $(this).text();
        queryURLHist = buildQueryUrlHist();
        $.ajax({
            url: queryURLHist,
            method: "GET"
        }).then(function (data) {

            weatherData = data;

            currentWeatherIcon = data.weather[0].icon;
            date = moment().format("MMM Do YY");
            currentWeatherIconEl = "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
            weathericon = $("<img/>", {
                id: "weather-icon",
                src: currentWeatherIconEl,
                width: 75
            });