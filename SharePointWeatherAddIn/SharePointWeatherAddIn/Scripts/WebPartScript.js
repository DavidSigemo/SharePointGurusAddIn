$(document).ready(function () {

    "use strict";

    var location = getQueryStringParameter("DefaultLocation");
    var tempUnit = getQueryStringParameter("TempUnit");

    var showWindS = getQueryStringParameter("ShowWindSpeed");

    if (showWindS == "0") {
        $("#divSpeed").hide();
    }
    else {
        $("#divSpeed").show();
    }

    var showWindD = getQueryStringParameter("ShowWindDirection");
    if (showWindD == "0") {
        $("#divDirection").hide();
    }
    else {
        $("#divDirection").show();
    }

    var showForecast = getQueryStringParameter("ShowForecast");
    if (showForecast == "0") {
        $("#divPanel").hide();
    }
    else {
        $("#divPanel").show();
    }



    var layout = getQueryStringParameter("DisplayTemplate");
    console.log(layout);
    if (layout == "0") {
        $("#wrapper").removeClass("css1");
        $("#wrapper").removeClass("css2");
        $("#wrapper").addClass("css0");
    }
    else if (layout == "1") {

        $("#wrapper").removeClass("css0");
        $("#wrapper").removeClass("css2");
        $("#wrapper").addClass("css1");
    }
    else {

        $("#wrapper").removeClass("css0");
        $("#wrapper").removeClass("css1");
        $("#wrapper").addClass("css2");
    }


    //--------------------------------------------------------------------------------------------------------------------------------------
    // Date and Time for current day and the next 5 days

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var dayNames1 = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]


    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $('#Date').html(dayNames[newDate.getDay()] + ' ' + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

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

    //--------------------------------------------------------------------------------------------------------------------------------------
    // 

    init();

    function init() {
        getCoordinates(location);

    }

    function getCoordinates(locationParameter) {

        var apiKey = "AIzaSyB0O3kAHmPtbwUHu45zojOyMgFYGj51Kvc";
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(locationParameter).concat('&key=').concat(apiKey);

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
                initData(responseData);

            }
        });
    }


    function initData(weatherData) {

        var locationText = $('#dataLocation');
        var temperatureText = $('#dataTemperature');
        var weatherIcon = $('#dataWeatherIcon');
        var weatherText = $('#dataWeatherText');
        var windSpeedText = $('#dataWindSpeed');
        var windDirectionText = $('#dataWindDirection');
        var windDirectionDetailText = $('#dataWindDirectionDetailed');


        var location = weatherData.timezone.split('/')[1];
        locationText.text(location);

        //var temperature = (Math.round(((weatherData.currently.temperature - 32) * 5) / 9));
        //temperatureText.text(temperature);

        var temperature = weatherData.currently.temperature;
        if (tempUnit === "C") {
            temperature = ((temperature - 32) * 5) / 9;
        }
        temperature = Math.round(temperature);
        temperatureText.text(temperature + "\u00B0".concat(tempUnit));

        var weatherTextString = weatherData.currently.summary;
        weatherText.text(weatherTextString);

        var windSpeed = weatherData.currently.windSpeed;
        windSpeedText.text(windSpeed);

        var windDirection = (weatherData.currently.windBearing / 22.5) + 0.5;
        var directions = ["North", "North-North East", "North East", "East-North East", "East", "East-South East", "South East", "South-South East", "South", "South-South West", "South West", "West-South West", "West", "West-North West", "North West", "North-North West"]
        windDirectionText.text(directions[Math.round(windDirection % 16)]);
        windDirectionDetailText.text(weatherData.currently.windBearing);

        //--------------------------------------------------------------------------------------------------------------------------------------
        // Max Temp for the next 5 days

        var maxTempText1 = $('#dataMaxTemperature1');
        var maxTemperature1 = weatherData.daily.data[1].temperatureMax;
        if (tempUnit === "C") {
            maxTemperature1 = ((maxTemperature1 - 32) * 5) / 9;
        }
        maxTemperature1 = Math.round(maxTemperature1);
        maxTempText1.text(maxTemperature1 + "\u00B0".concat(tempUnit));

        var maxTempText2 = $('#dataMaxTemperature2');
        var maxTemperature2 = weatherData.daily.data[2].temperatureMax;
        if (tempUnit === "C") {
            maxTemperature2 = ((maxTemperature2 - 32) * 5) / 9;
        }
        maxTemperature2 = Math.round(maxTemperature2);
        maxTempText2.text(maxTemperature2 + "\u00B0".concat(tempUnit));;

        var maxTempText3 = $('#dataMaxTemperature3');
        var maxTemperature3 = weatherData.daily.data[3].temperatureMax;
        if (tempUnit === "C") {
            maxTemperature3 = ((maxTemperature3 - 32) * 5) / 9;
        }
        maxTemperature3 = Math.round(maxTemperature3);
        maxTempText3.text(maxTemperature3 + "\u00B0".concat(tempUnit));

        var maxTempText4 = $('#dataMaxTemperature4');
        var maxTemperature4 = weatherData.daily.data[4].temperatureMax;
        if (tempUnit === "C") {
            maxTemperature4 = ((maxTemperature4 - 32) * 5) / 9;
        }
        maxTemperature4 = Math.round(maxTemperature4);
        maxTempText4.text(maxTemperature4 + "\u00B0".concat(tempUnit));

        var maxTempText5 = $('#dataMaxTemperature5');
        var maxTemperature5 = weatherData.daily.data[5].temperatureMax;
        if (tempUnit === "C") {
            maxTemperature5 = ((maxTemperature5 - 32) * 5) / 9;
        }
        maxTemperature5 = Math.round(maxTemperature5);
        maxTempText5.text(maxTemperature5 + "\u00B0".concat(tempUnit));



        //--------------------------------------------------------------------------------------------------------------------------------------
        // Min Temp for the next 5 days

        var minTempText1 = $('#dataMinTemperature1');
        var minTemperature1 = weatherData.daily.data[1].temperatureMin;
        if (tempUnit === "C") {
            minTemperature1 = ((minTemperature1 - 32) * 5) / 9;
        }
        minTemperature1 = Math.round(minTemperature1);
        minTempText1.text(minTemperature1 + "\u00B0".concat(tempUnit));

        var minTempText2 = $('#dataMinTemperature2');
        var minTemperature2 = weatherData.daily.data[2].temperatureMin;
        if (tempUnit === "C") {
            minTemperature2 = ((minTemperature2 - 32) * 5) / 9;
        }
        minTemperature2 = Math.round(minTemperature2);
        minTempText2.text(minTemperature2 + "\u00B0".concat(tempUnit));

        var minTempText3 = $('#dataMinTemperature3');
        var minTemperature3 = weatherData.daily.data[3].temperatureMin;
        if (tempUnit === "C") {
            minTemperature3 = ((minTemperature3 - 32) * 5) / 9;
        }
        minTemperature3 = Math.round(minTemperature3);
        minTempText3.text(minTemperature3 + "\u00B0".concat(tempUnit));

        var minTempText4 = $('#dataMinTemperature4');
        var minTemperature4 = weatherData.daily.data[4].temperatureMin;
        if (tempUnit === "C") {
            minTemperature4 = ((minTemperature4 - 32) * 5) / 9;
        }
        minTemperature4 = Math.round(minTemperature4);
        minTempText4.text(minTemperature4 + "\u00B0".concat(tempUnit));

        var minTempText5 = $('#dataMinTemperature5');
        var minTemperature5 = weatherData.daily.data[5].temperatureMin;
        if (tempUnit === "C") {
            minTemperature5 = ((minTemperature5 - 32) * 5) / 9;
        }
        minTemperature5 = Math.round(minTemperature5);
        minTempText5.text(minTemperature5 + "\u00B0".concat(tempUnit));





        // Icon for current day and the next 5 days

        var skycons = new Skycons({ "color": "black" });
        skycons.add("testCanvas", weatherData.currently.icon);

        var skycons1 = new Skycons({ "color": "black" });
        skycons1.add("testCanvas1", weatherData.daily.data[1].icon);

        var skycons2 = new Skycons({ "color": "black" });

        skycons2.add("testCanvas2", weatherData.daily.data[2].icon);

        var skycons3 = new Skycons({ "color": "black" });

        skycons3.add("testCanvas3", weatherData.daily.data[3].icon);

        var skycons4 = new Skycons({ "color": "black" });

        skycons4.add("testCanvas4", weatherData.daily.data[4].icon);

        var skycons5 = new Skycons({ "color": "black" });

        skycons5.add("testCanvas5", weatherData.daily.data[5].icon);

        skycons.play();
        skycons1.play();
        skycons2.play();
        skycons3.play();
        skycons4.play();
        skycons5.play();
    }


    function getQueryStringParameter(urlParameterKey) {

        var params = document.URL.split('?')[1].split('&');

        var strParams = '';

        for (var i = 0; i < params.length; i = i + 1) {

            var singleParam = params[i].split('=');

            if (singleParam[0] == urlParameterKey)

                return decodeURIComponent(singleParam[1]);

        }

    }






});


