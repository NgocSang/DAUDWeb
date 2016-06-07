/*global angular*/
var store = angular.module('App.details', ['ngRoute', 'firebase', 'App.providers', 'App.filters']);

store.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/store/details/:id', {
        templateUrl: 'details/details.html',
        controller: 'DetailsCtrl'
    });
}]);

store.controller('DetailsCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Auth, Ref, AuthData) {
    'use strict';
    
    window.abc = $scope;
    $scope.authData = AuthData;
    
    Auth.$onAuth(function (authData) {
        if (authData) {
            $scope.cart = $firebaseObject(Ref.child("cart/" + authData.uid + "/" + $routeParams.id));
            $scope.review = $firebaseObject(Ref.child("reviews/"  + $routeParams.id + "/" + authData.uid));
        } else {
            $scope.cart = $scope.review = null;
        }
    });
    
    $scope.product = {
        basicInfo: $firebaseObject(Ref.child("products/" + $routeParams.id + "/basicInfo")),
        detail: $firebaseObject(Ref.child("productDetail/" + $routeParams.id + "/detail")),
        color: $firebaseArray(Ref.child("products/" + $routeParams.id + "/color")),
        size: $firebaseArray(Ref.child("products/" + $routeParams.id + "/size")),
        imgUrl: $firebaseArray(Ref.child("productDetail/" + $routeParams.id + "/imgUrl").limitToFirst(4)),
        reviews: $firebaseArray(Ref.child("reviews/" + $routeParams.id))
    };
    
    $scope.changeImg = function (index) {
        $scope.product.largeImg = $scope.product.imgUrl.$getRecord(index);
    };
    
    $scope.product.imgUrl.$loaded().then(function () {
        $scope.changeImg(0);
    });
    
    $scope.addToCart = function () {
        if ($scope.authData.data) {
            if ($scope.cart.$value === null) {
                $scope.authData.quantity.$value = $scope.authData.quantity.$value + 1;
                $scope.authData.quantity.$save();
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
    
    $scope.addReview = function () {
        if ($scope.authData.data) {
            $scope.review.name = $scope.authData.name;
            $scope.review.avatar = $scope.authData.avatar;
            $scope.review.$save();
        } else {
            window.alert("Please login first!");
        }
    };
});