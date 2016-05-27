'use strict';

var store = angular.module('App.details', ['ngRoute']);

store.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/store/details/:id', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}]);

store.controller('DetailsCtrl', [function() {

}]);