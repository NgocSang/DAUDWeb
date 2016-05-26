'use strict';

var cart = angular.module('App.cart', ['ngRoute']);

cart.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'cart/cart.html',
    controller: 'CartCtrl'
  });
}]);

cart.controller('CartCtrl', ["$scope", "$firebaseObject",
    function ($scope, $firebaseObject) {

        var ref = new Firebase("https://das-shop.firebaseio.com/cart");
        var obj = $firebaseObject(ref);
        obj.$bindTo($scope, "data").then(function () {
        });



        $scope.removeItem = function (index) {
            var item = $(".item-row");
            item[index].className += " animated hinge";

            setTimeout(function () {
                delete $scope.data[index];
                $scope.$apply();
            }, 2000);
        }

    }
]);