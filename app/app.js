'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('App', ['ngRoute', 'App.store', 'App.cart']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise(
      {
          redirectTo: '/store'
      });
}]);

