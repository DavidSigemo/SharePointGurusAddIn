$(document).ready(function () {
    var url = "https://api.darksky.net/forecast/6ebbfb6cba7bb3d4c1b0d03800b23abe/59.3446,18.0237"
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (responseData) {
            initGraph(responseData);
        }
    });
});
