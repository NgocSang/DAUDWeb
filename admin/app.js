var app = angular.module('App', ['firebase', 'ngRoute', 'App.home', 'App.providers', 'App.details', 'App.order', 'App.login' ,'App.addproduct']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);

app.controller("IndexCtrl", function ($scope, $firebaseObject, $firebaseArray, Auth, Ref, $location) {

    $scope.admin = {};

    $scope.login = function () {
        Auth.$authWithPassword($scope.admin);
    };
    
    Auth.$onAuth(function (data) {
        if (data !== null) {
            $firebaseObject(Ref.child("adminTest")).$loaded().then(function () {
                $scope.authData = data;

                if ($location.url() === "/login") {
                    $location.url("home");
                }

                $scope.orderA = $firebaseArray(Ref.child("order"));
                $scope.productDetailO = $firebaseObject(Ref.child("productDetail"));
                $scope.productsA = $firebaseArray(Ref.child("products"));
                $scope.productDetailA = $firebaseArray(Ref.child("productDetail"));
            })["catch"](function (error) {
                $scope.authData = null;
                $scope.orderA = null;
                $scope.productDetailO = null;
                $scope.productsA = null;

                $scope.logout();
                window.alert("Not admin!");
                $location.url("login");
            });
        } else {
            $location.url("login");
        }
        
    });
    
    $scope.logout = function () {
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
        
        arrayO.$ref().child(id).set(object, function (error) {
            if (error === null) {
                window.alert("Success! Id = " + id);
            } else {
                $scope.productsA.$remove($scope.productsA.$getRecord(id));
                window.alert(error);
            }
        });
        
    };
    
    $scope.objectUpdate = function (object) {
        object.$save().then(function (data) {
            window.alert("Success for '" + object.$ref().parent().key() + "'!")
        }).catch(function (error) {
            window.alert(error);
        });
    };
});