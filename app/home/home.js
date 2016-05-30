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
    
    // Top 4
    // $scope.top4 = $firebaseArray(Ref.child("productList/featured").limitToFirst(4).ref());
    
    $scope.featured = $firebaseArray(Ref.child("productList/featured"));
});