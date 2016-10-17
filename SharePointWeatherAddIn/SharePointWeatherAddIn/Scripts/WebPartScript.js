﻿$(document).ready(function () {
    var url = "https://api.darksky.net/forecast/6ebbfb6cba7bb3d4c1b0d03800b23abe/59.3446,18.0237"
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (responseData) {
            var skycons = new Skycons({ "color": "black" });
            console.log(responseData.currently.icon);
            skycons.add("testCanvas", responseData.currently.icon);


            var skycons1 = new Skycons({ "color": "black" });
            console.log(responseData.daily.data[1].icon);
            skycons1.add("testCanvas1", responseData.daily.data[1].icon);

            var skycons2 = new Skycons({ "color": "black" });
            console.log(responseData.daily.data[2].icon);
            skycons2.add("testCanvas2", responseData.daily.data[2].icon);

            var skycons3 = new Skycons({ "color": "black" });
            console.log(responseData.daily.data[3].icon);
            skycons3.add("testCanvas3", responseData.daily.data[3].icon);

            var skycons4 = new Skycons({ "color": "black" });
            console.log(responseData.daily.data[4].icon);
            skycons4.add("testCanvas4", responseData.daily.data[4].icon);

            var skycons5 = new Skycons({ "color": "black" });
            console.log(responseData.daily.data[5].icon);
            skycons5.add("testCanvas5", responseData.daily.data[5].icon);
            
      

            getWeatherData();
            skycons.play();
            skycons1.play();
            skycons2.play();
            skycons3.play();
            skycons4.play();
            skycons5.play();
        }
    });

    var monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
    var dayNames = ["Söndagen", "Måndagen", "Tisdagen", "Onsdagen", "Torsdagen", "Fredagen", "Lördagen"]
    var dayNames1 = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]

  
    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $('#Date').html(dayNames[newDate.getDay()] + " den " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

    var newDate1 = new Date();
    newDate1.setDate(newDate1.getDate() + 1);
    $('#Date1').html(dayNames1[newDate1.getDay()]);
  
    var newDate2 = new Date();
    newDate2.setDate(newDate2.getDate() + 2);
    $('#Date2').html(dayNames1[newDate2.getDay()]);

    var newDate3 = new Date();
    newDate3.setDate(newDate3.getDate() + 3);
    $('#Date3').html(dayNames1[newDate3.getDay()]);

    var newDate4 = new Date();
    newDate4.setDate(newDate4.getDate() + 4);
    $('#Date4').html(dayNames1[newDate4.getDay()]);

    var newDate5 = new Date();
    newDate5.setDate(newDate5.getDate() + 5);
    $('#Date5').html(dayNames1[newDate5.getDay()]);

    setInterval(function () {
        var seconds = new Date().getSeconds();
        $("#sec").html((seconds < 10 ? "0" : "") + seconds);
    }, 1000);

    setInterval(function () {
       
        var minutes = new Date().getMinutes();
      
        $("#min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);

    setInterval(function () {
       
        var hours = new Date().getHours();
      
        $("#hours").html((hours < 10 ? "0" : "") + hours);
    }, 1000);


    init();

    function init() {
        temp();
    }
   function temp() {
       
        var apiKey = "AIzaSyB0O3kAHmPtbwUHu45zojOyMgFYGj51Kvc";
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat('Stockholm').concat('&key=').concat(apiKey);

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
        console.log(weatherData);
        var locationText = $('#dataLocation');
        var temperatureText = $('#dataTemperature');
        var weatherIcon = $('#dataWeatherIcon');
        var weatherText = $('#dataWeatherText');
        var windSpeedText = $('#dataWindSpeed');
        var windDirectionText = $('#dataWindDirection');
        var windDirectionDetailText = $('#dataWindDirectionDetailed');

        var location = weatherData.timezone.split('/')[1];
        locationText.text(location);

        var temperature = (Math.round(((weatherData.currently.temperature - 32) * 5) / 9));
        temperatureText.text(temperature);

        var weatherTextString = weatherData.currently.summary;
        weatherText.text(weatherTextString);

        var windSpeed = weatherData.currently.windSpeed;
        windSpeedText.text(windSpeed);

        var windDirection = (weatherData.currently.windBearing / 22.5) + 0.5;
        var directions = ["North", "North-North East", "North East", "East-North East", "East", "East-South East", "South East", "South-South East", "South", "South-South West", "South West", "West-South West", "West", "West-North West", "North West", "North-North West"]
        windDirectionText.text(directions[Math.round(windDirection % 16)]);
        windDirectionDetailText.text(weatherData.currently.windBearing);


    }

});


