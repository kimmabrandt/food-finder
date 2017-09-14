// Data
var places = [
  {
    city : 'Port Angeles',
    desc : 'This is the best place in the world!',
    lat : 48.116600,
    long : -123.449249
  },
  {
    city : 'Quilcene',
    desc : 'Never heard of it.',
    lat : 47.818688,
    long : -122.855988
  },
  {
    city : 'Naches',
    desc : 'Pacific Crest Trail',
    lat : 47.012098,
    long : -121.372833
  },
  {
    city : 'Cinnebar',
    desc : 'Howrah Bridge!',
    lat : 46.606054,
    long : -122.523651
  },
  {
    city : 'Cosmopolis',
    desc : 'Kathipara Bridge!',
    lat : 46.775612,
    long : -123.504181
  }
];

// <script>
// function initMap() {
// var uluru = {lat: -25.363, lng: 131.044};
// var map = new google.maps.Map(document.getElementById('map'), {
//   zoom: 4,
//   center: uluru
// });
// var marker = new google.maps.Marker({
//   position: uluru,
//   map: map
// });
// }
// </script>


// Angular app
var foodFinderApp = angular.module('foodFinder', []);
foodFinderApp.controller('MapCtrl', function($scope){
	$("#sidebarInfo").hide();
  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(47, -122),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

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

  $scope.backSidebar = function() {
    $('#sidebarInfo').hide();
    $('#sidebar').show();
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);



  $scope.markers = [];

  var infoWindow = new google.maps.InfoWindow();



  var createMarker = function(info) {

    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
      icon: './images/burger4.png',
      title: info.city
    });
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

    google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
        $('#sidebarInfo').show();
        $('#sidebar').hide();

    });

    $scope.markers.push(marker);
  }

  for (i = 0; i < places.length; i++){
      createMarker(places[i]);
  }

  $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }

  });
