'use strict';

var cart = angular.module('App.cart', ['ngRoute']);

cart.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'cart/cart.html',
    controller: 'CartCtrl'
  });
}]);

cart.controller('CartCtrl', [function() {

}]);