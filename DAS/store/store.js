'use strict';

var store = angular.module('App.store', ['ngRoute']);

store.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/store', {
    templateUrl: 'store/store.html',
    controller: 'StoreCtrl'
  });
}]);

store.controller('StoreCtrl', [function() {

}]);