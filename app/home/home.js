'use strict';

var store = angular.module('App.home', ['ngRoute']);

store.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}]);

store.controller('HomeCtrl', [function() {

}]);