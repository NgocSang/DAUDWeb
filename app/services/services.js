'use strict';

var services = angular.module('App.services', ['ngRoute']);

services.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/services', {
    templateUrl: 'services/services.html',
    controller: 'ServicesCtrl'
  });
}]);

services.controller('ServicesCtrl', [function() {

}]);