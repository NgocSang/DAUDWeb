var user = angular.module('App.user', ['ngRoute', 'firebase', 'App.providers', 'App.filters']);
user.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/new', {
        templateUrl: 'addproduct/addproduct.html',
        controller: 'AddproductCtrl'
    });
}]);

newproduct.controller('AddproductCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Auth, Ref, AuthData) {
    imgCtrl = $scope;
    $scope.productDetailO = $firebaseObject(Ref.child("productDetail"));
    $scope.productsA = $firebaseArray(Ref.child("products"));
    $scope.arrayAdd = function (arrayA, object, idName) {
        object.basicInfo.imgUrl = imgCtrl.imgList[0];
        if (typeof object === "undefined" || object === null) {
            window.alert("Error!");
            return;
        }

        arrayA.$add(object).then(function (ref) {
            //$scope[idName] = ref.key();
            $scope[idName] = idName;
            window.alert("Success! New id: " + $scope[idName]);
        })["catch"](function (error) {
            window.alert(error);
        });
        console.log(object);
        console.log(idName);
    };
});