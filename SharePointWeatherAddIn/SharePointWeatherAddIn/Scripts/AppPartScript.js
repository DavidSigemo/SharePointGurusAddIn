(function (global) {
    "use strict";

    $('#ctl00_PlaceHolderSiteName_onetidProjectPropertyTitle').text("SharePoint Gurus Weather AddIn");

    var savedWeather = JSON.parse(localStorage.getItem("weatherData"));
    var activeLocation = (Cookies.get("activeLocation") !== null && Cookies.get("activeLocation") !== undefined) ? decodeURI(Cookies.get("activeLocation")) : "Stockholm";
    Cookies.set("activeLocation", activeLocation);
    var tempUnit = Cookies.get("tempUnit") !== undefined ? Cookies.get("tempUnit") : "C";
    $('#defaultLocationInput').val(activeLocation);
    $('#tempUnitInput').val(tempUnit);

    init();

    function init() {
        var getNewWeather = true;
        if (savedWeather !== null) {
            var savedTime = moment.unix(savedWeather.Data.currently.time).format("YYYY-MM-DD hh:mm");
            var todayTime = moment().format("YYYY-MM-DD 00:00");

            if (moment(savedTime).isAfter(todayTime)) {
                getNewWeather = false;
            }
        }

        if (!getNewWeather && savedWeather.LocationName !== activeLocation) {
            getNewWeather = true;
        }


        if (getNewWeather) {
            getCoordinates(activeLocation);
        } else {
            initDataTable(savedWeather);
            initGraph(savedWeather);
        }
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

            if ($("#highchart-tempDay").highcharts() !== undefined && $("#highchart-MaxMin").highcharts() !== undefined) {
                $("#highchart-tempDay").highcharts().setSize(width, height, true);
                $("#highchart-MaxMin").highcharts().setSize(width, height, true);
            }
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
        var savedLocation = JSON.parse(localStorage.getItem("locationCoordinates"));

        if (savedLocation === null || location !== savedLocation.LocationName || location == "undefined") {
            var encodedLocation = encodeURI(location);
            var apiKey = "AIzaSyB0O3kAHmPtbwUHu45zojOyMgFYGj51Kvc";
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(encodedLocation).concat('&key=').concat(apiKey);

            $.get(url, function (responseData) {
                var locationResponse = responseData.results[0].geometry.location;
                var lat = locationResponse.lat;
                var lng = locationResponse.lng;
                var savedCoordinates = { "LocationName": location, "Lat": lat, "Lng": lng };
                localStorage.setItem("locationCoordinates", JSON.stringify(savedCoordinates));
                getWeatherData(location, lat, lng);
            })            
        } else {
            getWeatherData(savedLocation.LocationName, savedLocation.Lat, savedLocation.Lng);
        }
    }

    function getWeatherData(location, lat, lng) {
        var url = "https://api.darksky.net/forecast/6ebbfb6cba7bb3d4c1b0d03800b23abe/".concat(lat).concat(",").concat(lng);
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (responseData) {
                var weatherData = { "LocationName": location, "Data": responseData };
                localStorage.setItem("weatherData", JSON.stringify(weatherData));
                initDataTable(weatherData);
                initGraph(weatherData);
            }
        });
    }

    function initDataTable(inputData) {
        var weatherData = inputData.Data;
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

        var location = inputData.LocationName;
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

    function initGraph(inputData) {
        var weatherData = inputData.Data;

        var location = inputData.LocationName;
        var seriesTempHourly = [];
        var tempHourly = [];
        var seriesMaxMin = [];
        var maxTempsDaily = [];
        var minTempsDaily = [];


        $.each(weatherData.hourly.data.splice(0, 25), function (index, value) {
            var tempFahrenheit = value.temperature;
            if (tempUnit === "C") {
                var tempCelcius = ((tempFahrenheit - 32) * 5) / 9;
                tempHourly.push([moment.unix(value.time).format("HH"), Math.round(tempCelcius)]);
            }
            else {
                tempHourly.push([moment.unix(value.time).format("HH"), Math.round(tempFahrenheit)]);
            }
        });
        seriesTempHourly.push({
            name: "Temperature for the next 24 hours",
            data: tempHourly
        });
        $.each(weatherData.daily.data, function (index, value) {
            var currentWeatherTime = moment.unix(value.time).format("ddd");
            var tempFahrenheit = value.temperatureMax;
            if (tempUnit === "C") {
                var tempCelcius = ((tempFahrenheit - 32) * 5) / 9;
                maxTempsDaily.push([currentWeatherTime, Math.round(tempCelcius)]);
            }
            else {
                maxTempsDaily.push([currentWeatherTime, Math.round(tempFahrenheit)]);
            }
        });
        seriesMaxMin.push({
            name: 'Highest temperatures',
            data: maxTempsDaily
        });

        $.each(weatherData.daily.data, function (index, value) {
            var currentWeatherTime = moment.unix(value.time).format("dddd");

            var tempFahrenheit = value.temperatureMin;
            if (tempUnit === "C") {
                var tempCelcius = ((tempFahrenheit - 32) * 5) / 9;
                minTempsDaily.push([currentWeatherTime, Math.round(tempCelcius)]);
            }
            else {
                minTempsDaily.push([currentWeatherTime, Math.round(tempFahrenheit)]);
            }
        })
        seriesMaxMin.push({
            name: 'Lowest temperatures',
            data: minTempsDaily
        });

        $('#highchart-tempDay').highcharts({
            title: {
                text: 'Temperature for the next 24 hours for ' + location,
                x: -20 //center
            },
            subtitle: {
                text: '<a href="https://darksky.net/poweredby/" target="_blank">Powered by Dark Sky</a>',
                useHTML: true,
                x: -20
            },
            xAxis: {
                tickInterval: 1,
                labels: {
                    enabled: true,
                    formatter: function () { return seriesTempHourly[0].data[this.value][0]; },
                }
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
                tickInterval: 1,
                labels: {
                    enabled: true,
                    formatter: function () { return seriesMaxMin[0].data[this.value][0]; },
                }
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