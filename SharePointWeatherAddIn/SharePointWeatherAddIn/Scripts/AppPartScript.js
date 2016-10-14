(function () {
    "use strict";
    init();

    function init() {
        getWeatherData("59.3446", "18.0237");
        eventhandlers();
    }

    function eventhandlers() {
        $('#graphTabActive').on('click', function () {
            var graphTab = $('#graphTab');
            var dataTab = $('#dataTab');

            graphTab.addClass('active');
            dataTab.removeClass('active');
            $('#graphContent').css("display", "block");
            $('#dataContent').css("display", "none");
        });

        $('#dataTabActive').on('click', function () {
            var graphTab = $('#graphTab');
            var dataTab = $('#dataTab');

            dataTab.addClass('active');
            graphTab.removeClass('active');
            $('#graphContent').css("display", "none");
            $('#dataContent').css("display", "block");
        });

        $('#dataLocationSearch').on('click', function () {
            var locationSearchText = encodeURI($('#dataLocationInput').val());
            var apiKey = "AIzaSyB0O3kAHmPtbwUHu45zojOyMgFYGj51Kvc";
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(locationSearchText).concat('&key=').concat(apiKey);

            $.get(url, function (responseData) {
                var location = responseData.results[0].geometry.location;
                var lat = location.lat;
                var lng = location.lng;
                getWeatherData(lat, lng);
            })
        });
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
        console.log(weatherData);
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

        var location = weatherData.timezone.split('/')[1];
        locationText.text(location);

        var temperature = (Math.round(((weatherData.currently.temperature - 32) * 5) / 9));
        temperatureText.text(temperature);

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
        console.log(humidity);

        var pressure = weatherData.currently.pressure;
        pressureText.text(pressure);

        var windDirection = (weatherData.currently.windBearing / 22.5) + 0.5;
        var directions = ["North", "North-North East", "North East", "East-North East", "East", "East-South East", "South East", "South-South East", "South", "South-South West", "South West", "West-South West", "West", "West-North West", "North West", "North-North West"]
        windDirectionText.text(directions[Math.round(windDirection % 16)]);
        windDirectionDetailText.text(weatherData.currently.windBearing);
    }

    function initGraph(weatherData) {
        var series = [];
        var maxTemps = [];
        var minTemps = [];
        $.each(weatherData.daily.data, function (index, value) {
            //console.log(value.apparentTemperature);
            maxTemps.push(Math.round(((value.temperatureMax - 32) * 5) / 9));
        })
        series.push({
            name: 'Highest temperatures',
            data: maxTemps
        });

        $.each(weatherData.daily.data, function (index, value) {
            //console.log(value.apparentTemperature);
            minTemps.push(Math.round(((value.temperatureMin - 32) * 5) / 9));
        })
        series.push({
            name: 'Lowest temperatures',
            data: minTemps
        });

        $('#highchart').highcharts({
            title: {
                text: 'Temperature for the next 7 days',
                x: -20 //center
            },
            subtitle: {
                text: 'Powered by Dark Sky',
                x: -20
            },
            xAxis: {
                // columns: ["0", "1", "2", "3", "4", "5", "6"]
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
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
            series: series
        });
    }
})();