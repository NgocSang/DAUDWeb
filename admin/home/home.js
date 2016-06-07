var store = angular.module('App.home', ['ngRoute', 'firebase', 'App.providers']);

store.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            checkAdmin: function (AdminCheck) {
                return AdminCheck.check();
            }
        }
    });
}]);

store.controller('HomeCtrl', function ($scope, $firebaseArray, Ref) {
    'use strict';    


    $scope.all = $firebaseArray(Ref.child("products"));

    $scope.arrayDelete = function (arrayA, record) {
        arrayA.$remove(record).then(function (ref) {
            window.alert("Success for '" + arrayA.$ref().key() + "'!")
        })["catch"](function (error) {
            window.alert(error);
        });
    };

});