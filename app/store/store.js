/*global angular*/
var store = angular.module('App.store', ['ngRoute', 'firebase', 'App.providers']);

store.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/store', {
        templateUrl: 'store/store.html',
        controller: 'StoreCtrl'
    });
}]);

store.controller('StoreCtrl', function ($scope, $firebaseArray, Ref) {
    'use strict';
    
    $scope.all = $firebaseArray(Ref.child("productList/all"));
});