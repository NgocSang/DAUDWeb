'use strict';

var store = angular.module('App.contact', ['ngRoute']);

store.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html',
    controller: 'ContactCtrl'
  });
}]);

store.controller('ContactCtrl', [function() {

}]);