var city;
var cityArray = (JSON.parse(localStorage.getItem("cities")));
var forecastArray = [];

function getCityInfo(){
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=e2fb09f943d13edae5d62609baa96a83";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res){
          $("#cityName").text(res.name);
          $("#weatherIcon").attr("src", "https://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png");
          $("#currentDay").text(moment().format('dddd, MMMM Do, YYYY'));
          $("#temp").text("Temperature: " + res.main.temp + "F");
          $("#humi").text("Humidity: " + res.main.humidity + "%");
          $("#wind").text("Wind Speed: " + res.wind.speed + " MPH");
          var cityLat = res.coord.lat;
          var cityLon = res.coord.lon;
          var latLonURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=e2fb09f943d13edae5d62609baa96a83&lat=" + cityLat + "&lon=" + cityLon + "&cnt=1"
          $.ajax({
              url: latLonURL,
              method: "GET"
          }).then(function(newres){
              var uvIndexBadge = $("<span>").text(newres[0].value);
              uvIndexBadge.addClass("badge");
              if (newres[0].value < 3){
                  uvIndexBadge.addClass("badge-success");
              } else if (newres[0].value > 8){
                uvIndexBadge.addClass("badge-danger");
              } else {
                uvIndexBadge.addClass("badge-warning");
              }
              $("#uvin").text("UV Index: ")
              $("#uvin").append(uvIndexBadge);
          })
          })
};
function clearForecast(){
  $("#forecast").empty();
}
function storeCityInfo(){
  localStorage.setItem("cities",JSON.stringify(cityArray));
};
function addCityButton(){
  var newCityLink = $("<button type='button' id='" + city + "' class='list-group-item citybutton list-group-item-action'>" + city + "</button>");
  $("#cityList").prepend(newCityLink);
};
function populate5DayForecast(){
  clearForecast();
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=e2fb09f943d13edae5d62609baa96a83&units=imperial"
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res){
        for (var i=0; i < res.list.length; i++){
          if (res.list[i].dt_txt.includes("15:00:00")){
            var forecastData = res.list[i];
            forecastArray.push(forecastData);
            }};
            for (i=0;i<5;i++){
            var newForecastBadge = $("<span class='badge badge-primary'><br><h4>" + moment().add(i, 'days').format("dddd") + "</h4><h4>"+ moment().add(i, 'days').format("MM/DD/YY") + "</h4><img height='50px' src='https://openweathermap.org/img/wn/" + forecastArray[i].weather[0].icon + "@2x.png'><p>Temp: " + forecastArray[i].main.temp + "F</p><p>Humidity: " + forecastArray[i].main.humidity + "%</p><br></span><span>&nbsp;&nbsp;&nbsp;</span>");
            $("#forecast").append(newForecastBadge);}
            forecastArray = [];
        })};

$(document).on("click", ".citybutton", function() {
  city = $(this).text();
  getCityInfo();
  clearForecast();
  populate5DayForecast();
  storeCityInfo();
});

$("#searchButton").on("click", function(e){
    event.preventDefault();
    city = $("#cityInput").val();
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=e2fb09f943d13edae5d62609baa96a83";
    getCityInfo();
    clearForecast();
    cityArray.unshift(city);
    storeCityInfo();
    populate5DayForecast();
    addCityButton();
    });



 
if (cityArray == null){ 
    cityArray = ["Orlando","Miami","Los Angeles","New York City","San Francisco"];
    displayCityInfo();
    for (var i = 4; i > -1; i--){
      var newCityLink = $("<button type='button' id='" + cityArray[i] + "' class='list-group-item citybutton list-group-item-action'>" + cityArray[i] + "</button>")
      $("#cityList").prepend(newCityLink);
}} else {
    displayCityInfo();
    for (var i = 4; i > -1; i--){
        var newCityLink = $("<button type='button' id='" + cityArray[i] + "' class='list-group-item citybutton list-group-item-action'>" + cityArray[i] + "</button>")
        $("#cityList").prepend(newCityLink);
}};

function displayCityInfo(){
    city = cityArray[0];
    getCityInfo();
    clearForecast();
    populate5DayForecast();
};

$(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;}});