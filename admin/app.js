var app = angular.module('App', ['firebase', 'ngRoute', 'App.home', 'App.providers', 'App.details', 'App.order', 'App.login' ,'App.addproduct']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);

app.controller("IndexCtrl", function ($scope, $firebaseObject, $firebaseArray, $firebaseAuth, Auth, $anchorScroll, Ref, AuthData) {

    $scope.productDetailO = $firebaseObject(Ref.child("productDetail"));
    $scope.productsA = $firebaseArray(Ref.child("products"));

    $scope.login = function () {
        window.alert("vo");
        Auth.$authWithPassword({
            "email": "test2@gmail.com",
            "password": "1"
        });
    };
    Auth.$onAuth(function (data){
        if (data) {
            $scope.orderA = $firebaseArray(Ref.child("order"));
        }
    });
    $scope.logout = function () {
        window.alert("vo");
        Auth.$unauth();
    };
    $scope.all = $firebaseArray(Ref.child("products"));
    $scope.getKeys = function (object) {
        return Object.keys(object); // Tra ve tat ca key cua objct
    };
    $scope.simplifyObject = function (item) {
        return ['$id', '$priority', '$$hashKey'].indexOf(item) < 0;
    };
    $scope.deleteKey = function (object, key) {
        delete object[key];
    };
    $scope.arrayAddUpdate = function (arrayO, object, id) {
        if (typeof object === "undefined" || object === null) {
            window.alert("Error!");
            return;
        }
        console.log(arrayO);
        console.log(object);
        console.log(id);
        arrayO[id] = object;
        console.log(arrayO[id]);
        arrayO.$save().then(function (ref) {
            window.alert("Success! Id = " + id);
        })["catch"](function (error) {
            window.alert(error);
        });
    };
    $scope.objectUpdate = function (object) {
        object.$save().then(function (data) {
            window.alert("Sucess")
        }).catch(function (error) {
            window.alert(error);
        });
    };
});