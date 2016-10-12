(function () {
    "use strict";
    init();

    function init() {
        getWeatherData();
        eventhandlers();
    }

    function eventhandlers() {
        console.log('eventhandler');
        $('#graphTabActive').click(function () {
            console.log('graphClick');
            var graphTab = $('#graphTab');
            var dataTab = $('#dataTab');

            graphTab.addClass('active');
            dataTab.removeClass('active');
            $('#chartTab').css("display", "block");
        });

        $('#dataTabActive').click(function () {
            console.log('dataClick');
            var graphTab = $('#graphTab');
            var dataTab = $('#dataTab');

            dataTab.addClass('active');
            graphTab.removeClass('active');
            $('#chartTab').css("display", "none");
        });
    }

    function getWeatherData() {
        console.log('getWeatherData');

        var url = "https://api.darksky.net/forecast/6ebbfb6cba7bb3d4c1b0d03800b23abe/59.3446,18.0237"
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (responseData) {
                initGraph(responseData);
            }
        });
    }

    var initGraph = function (weatherData) {
        var series = [];
        var avgTemps = []
        $.each(weatherData.hourly.data, function (index, value) {
            avgTemps.push(Math.round(((value.temperature - 32) * 5) / 9));
        })
        series.push({
            name: 'Temperature',
            data: avgTemps
        });

        console.log(series);
        $('#chart').highcharts({
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['01', '02', '03', '04', '05',
                    '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18',
                    '19', '20', '21', '22', '23', '24'
                ]
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