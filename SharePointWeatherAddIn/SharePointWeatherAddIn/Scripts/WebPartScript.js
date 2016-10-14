$(document).ready(function () {
    $.get("https://api.darksky.net/forecast/6ebbfb6cba7bb3d4c1b0d03800b23abe/59.3446,18.0237", function (response) {
        console.log(response);
        $("#name").text(response.name);
        $("#temp").text(response.main.temp);
        $("#humidity").text(response.main.humidity);
    });
});