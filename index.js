var searchDirection = "https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyBgFFuN9ajY-0k6fVbx9OWQdE84Cdk5RdU"
var origin;
var destination;

var map;
var service;
var infoWindow = new google.maps.InfoWindow();
var lat;
var lng;
var markers = [];



// initMap();
// getLocation();

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

        
        // $("#resultsContainer").append().text(results);
        // $("#resultsContainer").empty();

        // var resultDiv = $("<div>").addClass("Directions");

        // var startLabel = $("<h3>").addClass("Starting");
        // startLabel.attr("Starting");
        // startLabel.text(results);

        // $("resultContainer").append(startLabel);


    })
}

// Creates initial map that renders as soon as the page loads.
// Los Angeles is the initial center point before the maps/places api's ask to enable current-location services.
// initial zoom level is 13.


function initMap() {

    var myLocation = { lat: 34.03272990000001, lng: -118.4939732};

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 13
    });

}



// getLocation() checks to see if the user allowed us to use the current-location services.
// If they have allowed us to use it it will get the users current position and uses the showPosition 
// function to set the center of the map to the current position cordinates.
// If the user has not allowed us to use their current location, the map will never center itself over the users location.

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }

// function showPosition(position) {
//     lat = position.coords.latitude;
//     lng = position.coords.longitude;
//     map.setCenter(new google.maps.LatLng(lat, lng));
// }



// We use a document.on("click") function in order to capture the value of the input box and place it in the newSearch variable.
// The search() function is then invoked 

$(document).on("click", "#submit", function(event) {
    event.preventDefault();
    console.log("test");
    search(event);
});



// // searchMap() first keeps the form from submitting and refreshing the page by using event.preventDefault().
// // searchMap() then creates a new object called request that holds a location, search term, search radius, and
// // an added search type which refines the number of results.

// // service.textSearch() is then invoked and passed in the request object and callback function.

// // function searchMap(newSearch) {
// //     event.preventDefault();
// //     var request = {
// //         location: new google.maps.LatLng(lat, lng),
// //         query: newSearch,
// //         radius: 500,
// //         type: ['restaurant']
// //     };

// //     service = new google.maps.places.PlacesService(map);
// //     service.textSearch(request, callback);
// // }



// function setMapOnAll(map) {
//     for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(map);
//     }
// }



// // deleteMarkers() goes through every marker in the markers[] array using a for loop and 
// // sets the .setMap() on all of the markers to null making them dissappear from the map.
// // then deleteMarkers() also clears the markers[] array which prevents those markers from ever appearing again on the map.
// // That markers[] array is then used for the next set of search results which will be loaded in and produce there own markers.

// function deleteMarkers() {
//     for (var i = 0; i < markers.length; i++) {
//         setMapOnAll(null);
//     }
//     markers = [];
// }



// $(document).on("click", "#search", function () {
//     deleteMarkers();
// })



// // createMarker() creates a new marker at the position given, which is the position that is passed 
// // in the place variable which holds the latitude and longitude of the current result.

// function createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });

//     google.maps.event.addListener(marker, 'click', function () {
//         console.log(place);
//         var content = {
//             name: place.name,
//             address: place.formatted_address,
//             rating: place.rating
//         }



//         // This block of code takes the previously constructed infoWindow and uses .setContent to set 
//         // the content to the name of the establishment, address, and rating.

//         console.log(content);
//         var stringAddress = content.address;
//         var stringName = content.name;
//         var stringRating = content.rating;
//         infoWindow.setContent(stringName +"<br>"+ stringAddress +"<br>"+ stringRating + " Stars");
//         infoWindow.open(map, this);
//     });

//     markers.push(marker);
// }



// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             createMarker(results[i]);
//         }
//     }
// }