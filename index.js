var searchDirection = "https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyBgFFuN9ajY-0k6fVbx9OWQdE84Cdk5RdU"
var origin;
var destination;

var map;
var service;
var infoWindow = new google.maps.InfoWindow();
var lat;
var lng;
var markers = [];


function search(event) {
    event.preventDefault();
    origin = $("#origin").val().trim();
    destination = $("#destination").val().trim();
    var getDirection = searchDirection + "&origin=" + origin + "&destination=" + destination;

    $.ajax({
        url: getDirection,
        method: "GET"
    }).then(function (response) {
        var results = (response.routes[0].legs[0].steps);
        var distance = (response.routes[0].legs[0].distance);
        var duration = (response.routes[0].legs[0].duration);

        console.log(results, duration, distance)
        for (let i = 0; i < results.length; i++) {
           directions = (results[i].html_instructions);

           $("#resultsContainer").append(distance);
           $("#resultsContainer").append(duration);
           $("#resultsContainer").append(directions);
        }


    })
}


$(document).on("click", "#submit", function(event) {
    event.preventDefault();
    console.log("test");
    search(event);
});


