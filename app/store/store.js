/*global angular*/
var store = angular.module('App.store', ['ngRoute', 'firebase', 'App.providers', 'App.filters']);

store.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/store', {
        templateUrl: 'store/store.html',
        controller: 'StoreCtrl'
    });
}]);

store.controller('StoreCtrl', function ($scope, $firebaseArray, Ref) {
    'use strict';
    
    $scope.loading = true;
    $scope.all = $firebaseArray(Ref.child("products"));
    $scope.all.$loaded().then(function () {
        $scope.loading = false;
    });
    
    $scope.filter = {
        "basicInfo": {
            "name": ""
        },
        "color": ""
    };
    
    $scope.customFilter = {
        "price": "",
        "size": ""
    };
});