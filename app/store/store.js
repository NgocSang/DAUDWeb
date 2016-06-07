/*global angular*/
var store = angular.module('App.store', ['ngRoute', 'firebase', 'App.providers', 'App.filters']);

store.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/store', {
        templateUrl: 'store/store.html',
        controller: 'StoreCtrl'
    }).when('/store/:tag', {
        templateUrl: 'store/store.html',
        controller: 'StoreCtrl'
    });
}]);

store.controller('StoreCtrl', function ($scope, $firebaseArray, Ref, $routeParams, Global) {
    'use strict';
    
    $scope.loading = true;
    $scope.search = Global;
    $scope.all = $firebaseArray(Ref.child("products"));
    $scope.all.$loaded().then(function () {
        $scope.loading = false;
    });
    
    $scope.size = $firebaseArray(Ref.child("size"));
    $scope.filterObject = {
        "tag": $routeParams.tag
    };
    $scope.customFilter = {};
    
    $scope.isStrict = {
        "size": true,
        "color": false
    };
});