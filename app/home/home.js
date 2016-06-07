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
    
    var i = 0;
    $scope.slide = [true, false, false, false];
    
    $scope.nextSlide = function()
    {
        $scope.slide[i] = false;
        if (i == 3)
            i = 0;
        else
            i++;
        $scope.slide[i] = true;
    }
    
    $scope.prevSlide = function()
    {
        $scope.slide[i] = false;
        if (i == 0)
            i = 3;
        else
            i--;
        $scope.slide[i] = true;
    }
});