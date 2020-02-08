var cityArray = [];
var city;
function getCityInfo(){
  var queryURL = "http://openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b6907d289e10d714a6e88b30761fae22";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res){
          console.log(res);
          $("#cityName").text(res.name);
          $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png");
          console.log(res.weather[0].icon)
          $("#currentDay").text(moment().format('dddd, MMMM Do, YYYY'));
          $("#temp").text("Temperature: " + res.main.temp + "F");
          $("#humi").text("Humidity: " + res.main.humidity + "%");
          $("#wind").text("Wind Speed: " + res.wind.speed + " MPH");
          var cityLat = res.coord.lat;
          var cityLon = res.coord.lon;
          var latLonURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=e2fb09f943d13edae5d62609baa96a83&lat=" + cityLat + "&lon=" + cityLon + "&cnt=1"
          $.ajax({
              url: latLonURL,
              method: "GET"
          }).then(function(newres){
              var uvindex = newres[0].value
              $("#uvin").text("UV Index: " + uvindex)
              if (parseInt(uvindex) < 3){
                  $("#uvin").css("backgroundColor","Green");
              } else if (parseInt(uvindex) > 3 && parseInt(uvindex) < 8){
                $("#uvin").css("backgroundColor","Yellow");
              } else {
                $("#uvin").css("backgroundColor","Red");
              }
          })
          })
};

function storeCityInfo(){
  localStorage.setItem("cities",JSON.stringify(cityArray));
  };

$("#searchButton").on("click", function(e){
    event.preventDefault();
    var city = $("#cityInput").val();
    var newCityLink = $("<button type='button' id='" + city + "' class='list-group-item citybutton list-group-item-action'>" + city + "</button>")
    cityArray.push(city);
    $("#cityList").prepend(newCityLink);
    getCityInfo();

          // Create new ajax call to populate five day forecast using 
          // http://openweathermap.org/data/2.5/forecast?q= + CITY + &units=imperial&appid=b6907d289e10d714a6e88b30761fae22&cnt=5
            });

var newCityArray = (JSON.parse(localStorage.getItem("cities")));
var cityArray = newCityArray;
console.log(newCityArray); 
if (newCityArray != null && newCityArray.length < 1){ 
    var cityArray = [];
} else {
    for (var i = 0; i < 5; i++){
        var newCityLink = $("<button type='button' id='" + newCityArray[i] + "' class='list-group-item citybutton list-group-item-action'>" + newCityArray[i] + "</button>")
        $("#cityList").prepend(newCityLink);
}};

$(document).on("click", ".citybutton", function() {
    var city = $(this).text();
    getCityInfo();
});
if (newCityArray != null && newCityArray.length < 1){
    
} else {
   displayCityInfo(); 
}

function displayCityInfo(){
    var city = newCityArray[newCityArray.length-1];
    var queryURL = "http://openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b6907d289e10d714a6e88b30761fae22"
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res){
          $("#cityName").text(res.name);
          $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png");
          $("#currentDay").text(moment().format('dddd, MMMM Do, YYYY'));
          $("#temp").text("Temperature: " + res.main.temp + "F");
          $("#humi").text("Humidity: " + res.main.humidity + "%");
          $("#wind").text("Wind Speed: " + res.wind.speed + " MPH");
          var cityLat = res.coord.lat;
          var cityLon = res.coord.lon;
          var latLonURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=e2fb09f943d13edae5d62609baa96a83&lat=" + cityLat + "&lon=" + cityLon + "&cnt=1"
          $.ajax({
              url: latLonURL,
              method: "GET"
          }).then(function(newres){
              var uvindex = newres[0].value
              $("#uvin").text("UV Index: " + uvindex)
              if (parseInt(uvindex) < 3){
                  $("#uvin").css("backgroundColor","Green");
              } else if (parseInt(uvindex) > 3 && parseInt(uvindex) < 8){
                $("#uvin").css("backgroundColor","Yellow");
              } else {
                $("#uvin").css("backgroundColor","Red");
              }
          })
          })
};

$(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });