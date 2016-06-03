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
        
        if (authData) {
            $scope.cart = $firebaseObject(Ref.child("cart/" + authData.uid + "/" + $routeParams.id));
            $scope.quantity = $firebaseObject(Ref.child("user/" + authData.uid + "/quantity"));
        }
    });
    
    $scope.product = {
        basicInfo: $firebaseObject(Ref.child("products/" + $routeParams.id + "/basicInfo")),
        detail: $firebaseObject(Ref.child("productDetail/" + $routeParams.id + "/detail")),
        color: $firebaseArray(Ref.child("products/" + $routeParams.id + "/color")),
        size: $firebaseArray(Ref.child("products/" + $routeParams.id + "/size")),
        imgUrl: $firebaseArray(Ref.child("productDetail/" + $routeParams.id + "/imgUrl").limitToFirst(4))
    };
    
    $scope.changeImg = function (index) {
        $scope.product.largeImg = $scope.product.imgUrl.$getRecord(0);
    };
    
    $scope.product.imgUrl.$loaded().then(function () {
        $scope.changeImg(0);
    });
    
    $scope.addToCart = function () {
        if ($scope.authData) {
            if ($scope.cart.$value === null) {
                $scope.quantity.$value = $scope.quantity.$value + 1;
                $scope.quantity.$save();
            }
            
            $scope.cart.name = $scope.product.basicInfo.name;
            $scope.cart.price = $scope.product.basicInfo.price;
            $scope.cart.imgUrl = $scope.product.basicInfo.imgUrl;

            $scope.cart.$save().then(function () {
                window.alert("Success!");
            });
        } else {
            window.alert("Please login first!");
        }
    };
});