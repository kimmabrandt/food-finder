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

  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(47, -122),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];


  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function(info) {

    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title: info.city
    });
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

    google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
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
