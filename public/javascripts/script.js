
var place;
var myLatLng;
var restName;

// yelp vars
var rating;
var price;
var url;


// Angular app
var foodFinderApp = angular.module('foodFinder', []);
foodFinderApp.controller('MapCtrl', function($scope){



  // hide sidebar info by default
  $("#sidebarInfo").hide();

  // back button on sidebar
  $scope.backSidebar = function() {
    $('#sidebarInfo').hide();
    $('#sidebar').show();
  }

  // get yelp ratings
  var getYelpRatings = function(place){
    console.log(place);
    var restaurantName = place.restaurant;
    var location = place.city;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + restaurantName + "&location=" + location + ",WA&Authorization=Bearer%20puhMNmwirFRkJjgjE5HmamkAg171rBt4ExNURU7fFSJwudbCGpaJSAv_QxnKs05rj9jMYk4S9OxSUO0CNsfaOo2XKAdvZ3ap-13Oul-OUT7s_sS5nrTT3qZGbbvmWXYx",
      "method": "GET",
      "headers": {
        "authorization": "Bearer puhMNmwirFRkJjgjE5HmamkAg171rBt4ExNURU7fFSJwudbCGpaJSAv_QxnKs05rj9jMYk4S9OxSUO0CNsfaOo2XKAdvZ3ap-13Oul-OUT7s_sS5nrTT3qZGbbvmWXYx",
        "cache-control": "no-cache",
        "postman-token": "1619556b-8746-926e-6d6e-2931f394bb47"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      rating = response.businesses[0].rating;
      price = response.businesses[0].price;
      url = response.businesses[0].url;

      $('#yelpRating').html(rating + '/5');
      $('#yelpPrice').html(price);
      $('#yelpUrl').html('<a href="' + url + '" target="new">View Yelp Page</a>');

      if (!rating) {
        $('#yelpRating').html('N/A');
      }
      if (!price) {
        $('#yelpPrice').html('N/A');
      }
      if (!url) {
        $('#yelpUrl').html('');
      }

      $('#yelpLoading').hide();
      $('#yelpInfoCont').show();

    });
    console.log('clicked')
  }

  // map configs
  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(47, -122),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  // if ( $(window).width() < 600){
  //
  //
  // }

  // Create a map object
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];

  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function(place) {
    myLatLng = {lat: place.latitude, lng: place.longitude};
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: myLatLng,
      icon: './images/burger4.png',
      // animation: google.maps.Animation.DROP,
      title: place.restaurant,
      ratings: place.rating
    });
    // marker content to be viewed in info window
    marker.content = '<div class="infoWindowContent"><h5>' + place.restaurant + '</h5>' + place.address + '</div>';

    // when marker is clicked
    google.maps.event.addListener(marker, 'click', function($scope){
        // yelp section
        $('#yelpRating').html('');
        $('#yelpPrice').html('');
        $('#yelpUrl').html('');
        $('#yelpInfoCont').hide();
        $('#yelpLoading').show();
        getYelpRatings(place);

        // set content of info window
        infoWindow.setContent(marker.content);
        infoWindow.open($scope.map, marker);

        //show sidebar info, hide main sidebar
        $('#sidebarInfo').show();
        $('#sidebar').hide();

        // set content of sidebar info
        $('#placeName').html(marker.title);
        $('#region').html(place.area);
        $('#address').html('<b>Address:</b><p>' + place.address + '</p>');
        if (place.comments) {
          $('#comments').html('<b>Comments:</b><p>' + place.comments + '</p>');
        } else {
          $('#comments').html('');
        }

    });

    $scope.markers.push(marker);
  }

  // loop thru restaurants array to create markers for each
  for (i = 0; i < 171; i++){
      place = restaurants[i];
      createMarker(place);
  }

  // open info window when click on marker
  $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }

  // zoom to location
  $scope.northCascades = function(){
    $scope.map.setCenter({lat: 48.38, lng: -121.041870});
    $scope.map.setZoom(9);
  }
  $scope.centralCascades = function(){
    $scope.map.setCenter({lat: 47.894823, lng: -121.041870});
    $scope.map.setZoom(8);
  }
  $scope.southCascades = function(){
    $scope.map.setCenter({lat: 45.997260, lng: -122.036133});
    $scope.map.setZoom(9);
  }
  $scope.mtRainier = function(){
    $scope.map.setCenter({lat: 46.841701, lng: -121.657104});
    $scope.map.setZoom(9);
  }
  $scope.olympics = function(){
    $scope.map.setCenter({lat: 47.688157, lng: -123.574219});
    $scope.map.setZoom(8);
  }
  $scope.pugetSound = function(){
    $scope.map.setCenter({lat: 48.3, lng: -122.43});
    $scope.map.setZoom(9);
  }
  $scope.northeastWA = function(){
    $scope.map.setCenter({lat: 47.986820, lng: -118.85});
    $scope.map.setZoom(8);
  }
  $scope.southeastWA = function(){
    $scope.map.setCenter({lat: 46.631168, lng: -118.85});
    $scope.map.setZoom(8);
  }


});
