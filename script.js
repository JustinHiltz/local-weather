// get location of visitor and get weather
function getLocation(unit) {
  $.get("http://ip-api.com/json", function(data) {
    getWeather(data.city, unit);
  },
  "jsonp");
}

// get location with celcius as default
getLocation(unit="&units=metric");

// main get weather function pulling location and units from get location function
function getWeather(loc, uni) {
  var api = "http://api.openweathermap.org/data/2.5/weather?q=";
  var loc = loc;
  var key = "&APPID=859cec7c1e0634a0054aa48e6a06cb1b";
  var uni = uni;

  $.getJSON(api + loc + key + uni, function(data) {
    var city = data.name;
    var temp = data.main.temp;
    var cond = data.weather[0].description;
    var icon = data.weather[0].icon;

    // displaying weather data
    var html = '<h2>Weather for <strong>' + city + '</strong></h2>';
        html += '<p>It\'s <strong>' + temp + '&deg;</strong>';
        html += '<img src="http://openweathermap.org/img/w/' + icon + '.png">';
        html += 'with <strong>' + cond + '</strong> today.</p>';

    $("#weather").html(html);
  });
}

// toggle between metric and imperial. metric is default
$('.fahrenheit').click(function() {
  getLocation("&units=imperial");
  $(this).addClass("secondary");
  $('.celcius').removeClass("secondary");
});

$('.celcius').click(function() {
  getLocation("&units=metric");
  $(this).addClass("secondary");
  $('.fahrenheit').removeClass("secondary");
});
