

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


var places2geocode = [
  {
    "restaurant": "Aardvark Express",
    "area": "Central Cascades",
    "city": "Snoqualmie Pass",
    "address": "521 WA-906, Snoqualmie Pass, WA 98068",
    "comments": "Sometimes we plan hikes based on wanting to eat at Aardvark.  Gotta have the hurry curry bowl\nThe Aardvark let us setup some trail magic last Sunday.  Dan the owner is a really nice guy, the hurry curry is amazing"
  },
  {
    "restaurant": "Best of Thai",
    "area": "Central Cascades",
    "city": "Cle Elum",
    "address": "321 E 1st St, Cle Elum, WA 98922",
    "comments": ""
  },
  {
    "restaurant": "Black Duck Cask and Bottle (The)",
    "area": "Central Cascades",
    "city": "Issaquah",
    "address": "317 NW Gilman Blvd #31-B, Issaquah, WA 98027",
    "comments": "For I90 hikes"
  },
  {
    "restaurant": "Brick (The)",
    "area": "Central Cascades",
    "city": "Roslyn",
    "address": "100 W Pennsylvania Ave, Roslyn, WA 98941",
    "comments": "Great food, service and brews\nYummy burgers and beer\nVegie burgers"
  }
]

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


// url: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY",

// url: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAOdRfWZ5wiAoD-cOeTvtYE1aJSP19dSgY",


var address = places2geocode[1].address;

$('#geocodeMe').click(function(){



  $.ajax({
    type: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAOdRfWZ5wiAoD-cOeTvtYE1aJSP19dSgY",
    dataType: "json",
    contentType : "application/json",
    success: function(result){
      console.log(result);
    },
  });


  // $.ajax({
  //   type: "GET",
  //   url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address,
  //   data: {
  //     key: 'AIzaSyAOdRfWZ5wiAoD-cOeTvtYE1aJSP19dSgY'
  //   },
  //   dataType: "json",
  //   contentType : "application/json",
  //   success: function(result){
  //     console.log(result);
  //   },
  // });

});


var geocoder;
var place;



// Angular app
var foodFinderApp = angular.module('foodFinder', []);
foodFinderApp.controller('MapCtrl', function($scope){
	$("#sidebarInfo").hide();

  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(47, -122),
    mapTypeId: google.maps.MapTypeId.TERRAIN
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

  // back button on sidebar
  $scope.backSidebar = function() {
    $('#sidebarInfo').hide();
    $('#sidebar').show();
  }


  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Create a geocoder object
  geocoder = new google.maps.Geocoder();

  $scope.markers = [];

  var infoWindow = new google.maps.InfoWindow();

$scope.placeName = undefined;


var marker = new google.maps.Marker({
  map: map,
  animation: google.maps.Animation.DROP,
  position: results[0].geometry.location
});

google.maps.event.addListener(marker, 'click',
  function() { clickWedding(wedding); }
);

  var createMarker = function(info) {
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
      icon: './images/burger4.png',
      title: info.city
    });
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';


    google.maps.event.addListener(marker, 'click', function($scope){
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
        $('#sidebarInfo').show();
        $('#sidebar').hide();
        // $scope.placeName = marker.title;
        // console.log(marker.title);
    });

    $scope.markers.push(marker);
  }

  for (i = 0; i < places2geocode.length; i++){
      // createMarker(places2geocode[i]);
      place = places2geocode[i];

      geocoder.geocode( { 'address': place.address},
      function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          place.latlong = results[0].geometry.location;
          createMarker(place);
        }
      }
    )

  }

//
// function addWeddingMarker(index)
// {
// var wedding = weddings[index];
// geocoder.geocode( { 'address': wedding.where},
//   function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       wedding.latlong = results[0].geometry.location;
//
//       var marker = new google.maps.Marker({
//         map: map,
//         animation: google.maps.Animation.DROP,
//         position: results[0].geometry.location
//       });
//
//       google.maps.event.addListener(marker, 'click',
//         function() { clickWedding(wedding); }
//       );




  $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }

  });





































              var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(25,80),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];

              var infoWindow = new google.maps.InfoWindow();

              var createMarker = function (info){

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

              for (i = 0; i < cities.length; i++){
                  createMarker(cities[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }

          });
