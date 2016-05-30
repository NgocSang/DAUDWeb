/*global angular*/
var store = angular.module('App.details', ['ngRoute', 'firebase', 'App.providers']);

store.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/store/details/:id', {
        templateUrl: 'details/details.html',
        controller: 'DetailsCtrl'
    });
}]);

store.controller('DetailsCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Ref, Auth) {
    'use strict';
    window.abc = $scope;
    
    Auth.$onAuth(function (authData) {
        $scope.authData = authData;
        $scope.cart = authData !== null ? $firebaseObject(Ref.child("cart/" + $scope.authData.uid + "/" + $routeParams.id)) : null;
    });
    
    $scope.product = {
        basicInfo: $firebaseObject(Ref.child("products/basicInfo/" + $routeParams.id)),
        color: $firebaseArray(Ref.child("products/color/" + $routeParams.id)),
        size: $firebaseArray(Ref.child("products/size/" + $routeParams.id)),
        imgUrl: $firebaseArray(Ref.child("products/imgUrl/" + $routeParams.id))
    };
    
    $scope.changeImg = function (index) {
        $scope.product.largeImg = $scope.product.imgUrl[index];
    };
    
    $scope.product.imgUrl.$loaded().then(function () {
        $scope.changeImg(0);
    });
    
    $scope.addToCart = function () {
        if ($scope.authData !== null) {
            $scope.cart.name = $scope.product.basicInfo.name;
            $scope.cart.price = $scope.product.basicInfo.price;
            $scope.cart.imgUrl = $scope.product.imgUrl[0].$value;
            $scope.cart.$save().then(function () {
                window.alert("Success!");
            });
        } else {
            window.alert("Please login first!");
        }
    };
});