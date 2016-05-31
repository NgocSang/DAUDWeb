/*global angular*/
var store = angular.module('App.home', ['ngRoute', 'firebase', 'App.providers']);

store.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}]);

store.controller('HomeCtrl', function ($scope, $firebaseArray, Ref) {
    'use strict';
    
    $scope.featured = $firebaseArray(Ref.child("featured"));
});