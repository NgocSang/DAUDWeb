'use strict';

var services = angular.module('App.services', ['ngRoute', 'ngAnimate']);

services.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/services', {
    templateUrl: 'services/services.html',
    controller: 'ServicesCtrl'
  });
}]);

//services.controller('ServicesCtrl', [function() {
//    var ref = new Firebase("https://das-shop.firebaseio.com/service");

//}]);

var sv;
services.controller("ServicesCtrl", ["$scope", "$firebaseObject",
    function ($scope, $firebaseObject) {
        //sv = $scope;
        $scope.show = false;
        var ref = new Firebase("https://das-shop.firebaseio.com/service");
        var obj = $firebaseObject(ref);
        obj.$bindTo($scope, "data").then(function () {
            //$scope.show = true;
        });
    }
]);



services.animation('.ser-grid-list', ['$animateCss', function ($animateCss) {
    return {
        enter: function (element, doneFn) {
            var height = element[0].offsetHeight;
            return $animateCss(element, {
                from: { height: '0px' },
                to: { height: height + 'px' },
                duration: 1 // one second
            });
        }
    }
}]);