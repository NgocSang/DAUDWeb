/*global angular, Firebase*/
var app = angular.module("App", ["firebase"]);

app.controller("testCtrl", function ($scope, $http, $firebaseObject, $firebaseArray, $firebaseAuth) {
    'use strict';

    window.abc = $scope;
    var ref = new Firebase("https://test2207.firebaseio.com"), notneed = ['$id', '$priority', '$$hashKey'];
    $scope.auth = $firebaseAuth(ref);

    $scope.auth.$onAuth(function (authData) {
        $scope.authData = authData;

        if (authData) {
            $scope.productsA = $firebaseArray(ref.child("products"));
            $scope.productsO = $firebaseObject(ref.child("products"));
            $scope.productDetailA = $firebaseArray(ref.child("productDetail"));
            $scope.productDetailO = $firebaseObject(ref.child("productDetail"));
            $scope.featuredA = $firebaseArray(ref.child("featured"));
            $scope.featuredO = $firebaseObject(ref.child("featured"));
            $scope.orderA = $firebaseArray(ref.child("order"));
        } else {
            $scope.productsA = null;
            $scope.productsO = null;
            $scope.productDetailA = null;
            $scope.productDetailO = null;
            $scope.featuredA = null;
            $scope.featuredO = null;
            $scope.orderA = null;
        }
    });

    $scope.login = function () {
        $scope.auth.$authWithPassword({
            "email": "abc@mail.com",
            "password": "123789456"
        });
    };

    $scope.logout = function () {
        $scope.auth.$unauth();
    };
    
    $scope.importJson = function (path, name) {
        $http.get(path).then(function (response) {
            $scope[name] = response.data;
        })["catch"](function (error) {
            delete $scope[name];
            window.alert(error.statusText);
        });
    };

    $scope.arrayAdd = function (arrayA, object, idName) {
        if (typeof object === "undefined" || object === null) {
            window.alert("Error!");
            return;
        }
        
        arrayA.$add(object).then(function (ref) {
            $scope[idName] = ref.key();
            window.alert("Success! New id: " + $scope[idName]);
        })["catch"](function (error) {
            window.alert(error);
        });
    };
    
    $scope.arrayDelete = function (arrayA, record) {
        arrayA.$remove(record).then(function (ref) {
            window.alert("Success!");
        })["catch"](function (error) {
            window.alert(error);
        });
    };
    
    $scope.arrayAddUpdate = function (arrayO, object, id) {
        if (typeof object === "undefined" || object === null) {
            window.alert("Error!");
            return;
        }
        
        arrayO[id] = object;
        arrayO.$save().then(function (ref) {
            window.alert("Success!");
        })["catch"](function (error) {
            window.alert(error);
        });
    };
    
    $scope.getKeys = function (object) {
        return Object.keys(object);
    };
    
    $scope.simplifyObject = function (item) {
        return notneed.indexOf(item) < 0;
    };
    
    $scope.deleteOrder = function (record, id) {
        record[id] = null;
        $scope.orderA.$save(record);
    };
    
//    $scope.arrayUpdate = function (arrayO, record, object) {
//        if (typeof object === "undefined" || object === null) {
//            window.alert("Error!");
//            return;
//        }
//        
//        var temp = angular.copy(record);
//        delete temp.$id;
//        delete temp.$priority;
//        
//        arrayO.$remove(record).then(function (ref) {
//            $firebaseObject(ref).$loaded().then(function (data) {
//                data.$value = object;
//                data.$save().then(function (ref) {
//                    window.alert("Success!");
//                })["catch"](function (error) {
//                    data.$value = temp;
//                    data.$save();
//                    window.alert(error);
//                });
//            });
//        })["catch"](function (error) {
//            window.alert(error);
//        });
//    };
    
//    $scope.createSimpleObject = function (object, deleteAttributes) {
//        var temp = angular.copy(object), i, len;
//        
//        for (i = 0, len = deleteAttributes.length; i < len; i = i + 1) {
//            delete temp[deleteAttributes[i]];
//        }
//        
//        return temp;
//    };
});