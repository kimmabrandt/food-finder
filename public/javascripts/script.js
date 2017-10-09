
var place;
var myLatLng;
var restName;

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

  // map configs
  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(47, -122),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

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
      animation: google.maps.Animation.DROP,
      title: place.restaurant
    });
    // marker content to be viewed in info window
    marker.content = '<div class="infoWindowContent"><h5>' + place.restaurant + '</h5>' + place.comments + '</div>';

    // when marker is clicked
    google.maps.event.addListener(marker, 'click', function($scope){
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
