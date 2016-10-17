$(document).ready(function () {
    var url = "https://api.darksky.net/forecast/6ebbfb6cba7bb3d4c1b0d03800b23abe/59.3446,18.0237"
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (responseData) {
            var skycons = new Skycons({ "color": "black" });
           
            console.log(responseData);
            skycons.add("testCanvas", responseData.currently.icon);
            temp();
            getWeatherData();
        }
    });
});
function temp() {
    
    var apiKey = "AIzaSyB0O3kAHmPtbwUHu45zojOyMgFYGj51Kvc";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat("Stockholm").concat('&key=').concat(apiKey);

    $.get(url, function (responseData) {
        var location = responseData.results[0].geometry.location;
        var lat = location.lat;
        var lng = location.lng;
        getWeatherData(lat, lng);
    })

};

function getWeatherData(lat, lng) {
    var url = "https://api.darksky.net/forecast/6ebbfb6cba7bb3d4c1b0d03800b23abe/".concat(lat).concat(",").concat(lng);
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (responseData) {
            initDataTable(responseData);
            
        }
    });
}
function initDataTable(weatherData) {
    var temperatureText = $('#dataTemperature');
    var temperature = (Math.round(((weatherData.currently.temperature - 32) * 5) / 9));
    temperatureText.text(temperature);

}
        
  



