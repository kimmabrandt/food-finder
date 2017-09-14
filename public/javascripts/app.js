var app = angular.module('foodFinder', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
  .when('/', {
    templateUrl : 'index.html'
  })
  .when('/sidebar', {
    templateUrl : 'sidebar.html',
    controller : 'SidebarCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
  // .when("/weather", {
  //   templateUrl : "weather.html",
  //   controller : "WeatherCtrl"
}]);


app.controller('HomeCtrl', ['$scope', function ($scope) {

}]);

app.controller('SidebarCtrl', ['$scope', function ($scope) {

}]);
