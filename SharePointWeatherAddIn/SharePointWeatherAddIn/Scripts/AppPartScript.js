(function (global) {
    "use strict";

    var activeLocation = Cookies.get("activeLocation") !== undefined ? decodeURI(Cookies.get("activeLocation")) : "Stockholm";
    var tempUnit = Cookies.get("tempUnit") !== undefined ? Cookies.get("tempUnit") : "C";
    $('#activeLocationInput').val(activeLocation);
    $('#tempUnitInput').val(tempUnit);
    console.log("activeLocation", activeLocation);
    console.log("tempUnit", tempUnit);

    init();

    function init() {
        getCoordinates(activeLocation);
        eventhandlers();
    }

    function eventhandlers() {
        $('#graphTabActive').on('click', function () {
            var graphTab = $('#graphTab');
            var dataTab = $('#dataTab');
            var otherTab = $('#otherTab');

            $('#appTabs li').removeClass('active');
            graphTab.addClass('active');
            //dataTab.removeClass('active');
            $('#graphContent').css("display", "block");
            $('#otherContent').css("display", "none");
            $('#dataContent').css("display", "none");
            $(window).resize();
        });

        $('#dataTabActive').on('click', function () {
            var graphTab = $('#graphTab');
            var dataTab = $('#dataTab');
            var otherTab = $('#otherTab');


            $('#appTabs li').removeClass('active');
            dataTab.addClass('active');
            //graphTab.removeClass('active');
            $('#graphContent').css("display", "none");
            $('#otherContent').css("display", "none");
            $('#dataContent').css("display", "flex");
        });

        $('#otherTabActive').on('click', function () {
            var graphTab = $('#graphTab');
            var dataTab = $('#dataTab');
            var otherTab = $('#otherTab');


            $('#appTabs li').removeClass('active');
            otherTab.addClass('active');
            //graphTab.removeClass('active');
            $('#graphContent').css("display", "none");
            $('#otherContent').css("display", "block");
            $('#dataContent').css("display", "none");
        });

        $('#dataLocationSearch').on('click', function () {
            activeLocation = $('#dataLocationInput').val();
            getCoordinates(activeLocation);
            return false;
        });

        $(window).resize(function () {
            var height = $('#graphContent').height() / 2;
            var width = $('#graphContent').width();
            $("#highchart-tempDay").highcharts().setSize(width, height, true);
            $("#highchart-MaxMin").highcharts().setSize(width, height, true);
        });

        $('#saveSettingsButton').on('click', function () {
            var newactiveLocation = $('#defaultLocationInput').val();
            var newTempUnit = $('#tempUnitInput :selected').val();

            if (newactiveLocation !== "") {
                Cookies.set("activeLocation", encodeURI(newactiveLocation));
                Cookies.set("tempUnit", newTempUnit);
            }
            else {
                window.alert("Please enter a default location!");
            }
            location.reload();
        })
    }

    function getCoordinates(location) {
        var encodedLocation = encodeURI(location);
        var apiKey = "AIzaSyB0O3kAHmPtbwUHu45zojOyMgFYGj51Kvc";
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(encodedLocation).concat('&key=').concat(apiKey);
        console.log("geocode URL", url);

        $.get(url, function (responseData) {
            var location = responseData.results[0].geometry.location;
            var lat = location.lat;
            var lng = location.lng;
            getWeatherData(lat, lng);
        })
    }

    function getWeatherData(lat, lng) {
        var url = "https://api.darksky.net/forecast/6ebbfb6cba7bb3d4c1b0d03800b23abe/".concat(lat).concat(",").concat(lng);
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (responseData) {
                initDataTable(responseData);
                initGraph(responseData);
            }
        });
    }

    function initDataTable(weatherData) {
        var locationText = $('#dataLocation');
        var temperatureText = $('#dataTemperature');
        var weatherIcon = $('#dataWeatherIcon');
        var weatherText = $('#dataWeatherText');
        var ozoneText = $('#dataOzone');
        var windSpeedText = $('#dataWindSpeed');
        var humidityText = $('#dataHumidity');
        var pressureText = $('#dataPressure');
        var windDirectionText = $('#dataWindDirection');
        var windDirectionDetailText = $('#dataWindDirectionDetailed');
        var windDirectionImg = $('#windDirArrowImg');

        var location = activeLocation;
        locationText.text(location);

        var temperature = weatherData.currently.temperature;
        if (tempUnit === "C") {
            temperature = ((temperature - 32) * 5) / 9;
        }
        temperature = Math.round(temperature);
        temperatureText.text(temperature + "\u00B0".concat(tempUnit));

        var skycons = new Skycons({
            "color": "black"
        });
        skycons.add('dataWeatherIcon', weatherData.currently.icon);
        skycons.play();

        var weatherTextString = weatherData.currently.summary;
        weatherText.text(weatherTextString);

        var ozone = weatherData.currently.ozone;
        ozoneText.text(ozone);

        var windSpeed = weatherData.currently.windSpeed;
        windSpeedText.text(windSpeed);

        var humidity = weatherData.currently.humidity * 100;
        humidityText.text(humidity);

        var pressure = weatherData.currently.pressure;
        pressureText.text(pressure);

        var currentWindDir = weatherData.currently.windBearing;
        var windDirection = (currentWindDir / 22.5) + 0.5;
        var directions = ["North", "North-North East", "North East", "East-North East", "East", "East-South East", "South East", "South-South East", "South", "South-South West", "South West", "West-South West", "West", "West-North West", "North West", "North-North West"]
        windDirectionText.text(directions[Math.round(windDirection % 16)]);
        windDirectionDetailText.text(weatherData.currently.windBearing);

        windDirectionImg.css("webkitTransform", "rotate(" + currentWindDir + "deg)");
    }

    function initGraph(weatherData) {
        var location = activeLocation;
        var seriesTempHourly = [];
        var tempHourly = [];
        var seriesMaxMin = [];
        var maxTempsDaily = [];
        var minTempsDaily = [];

        $.each(weatherData.hourly.data, function (index, value) {
            var tempFahrenheit = value.temperature;
            if (tempUnit === "C") {
                var tempCelcius = ((tempFahrenheit - 32) * 5) / 9;
                tempHourly.push(Math.round(tempCelcius));
            }
            else {
                tempHourly.push(Math.round(tempFahrenheit));
            }
        });
        seriesTempHourly.push({
            name: "Temperature for the next 48 hours",
            data: tempHourly
        });
        $.each(weatherData.daily.data, function (index, value) {
            var tempFahrenheit = value.temperatureMax;
            if (tempUnit === "C") {
                var tempCelcius = ((tempFahrenheit - 32) * 5) / 9;
                maxTempsDaily.push(Math.round(tempCelcius));
            }
            else {
                maxTempsDaily.push(Math.round(tempFahrenheit));
            }
        });
        seriesMaxMin.push({
            name: 'Highest temperatures',
            data: maxTempsDaily
        });

        $.each(weatherData.daily.data, function (index, value) {
            var tempFahrenheit = value.temperatureMin;
            if (tempUnit === "C") {
                var tempCelcius = ((tempFahrenheit - 32) * 5) / 9;
                minTempsDaily.push(Math.round(tempCelcius));
            }
            else {
                minTempsDaily.push(Math.round(tempFahrenheit));
            }
        })
        seriesMaxMin.push({
            name: 'Lowest temperatures',
            data: minTempsDaily
        });

        $('#highchart-tempDay').highcharts({
            title: {
                text: 'Temperature for the next 48 hours for ' + location,
                x: -20 //center
            },
            subtitle: {
                text: '<a href="https://darksky.net/poweredby/" target="_blank">Powered by Dark Sky</a>',
                useHTML: true,
                x: -20
            },
            xAxis: {
                // columns: ["0", "1", "2", "3", "4", "5", "6"]
            },
            yAxis: {
                title: {
                    text: 'Temperature (°' + tempUnit + ')'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°' + tempUnit
            },
            credits: {
                enabled: false
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    allowPointSelect: true
                }
            },
            series: seriesTempHourly
        });

        $('#highchart-MaxMin').highcharts({
            title: {
                text: 'Highest and lowest temperatures for the next 7 days for ' + location,
                x: -20 //center
            },
            subtitle: {
                text: '<a href="https://darksky.net/poweredby/" target="_blank">Powered by Dark Sky</a>',
                useHTML: true,
                x: -20
            },
            xAxis: {
                // columns: ["0", "1", "2", "3", "4", "5", "6"]
            },
            yAxis: {
                title: {
                    text: 'Temperature (°' + tempUnit + ')'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°' + tempUnit
            },
            credits: {
                enabled: false
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    allowPointSelect: true
                }
            },
            series: seriesMaxMin
        });
        $(window).resize();
    }
})(this);