'use strict';

var cart = angular.module('App.cart', ['ngRoute', 'App.providers']);

cart.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cart', {
        templateUrl: 'cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            "checkLogin": function (Auth, $location) {
                return Auth.$requireAuth()["catch"](function (error) {
                    $location.url("home");
                    window.alert("Please login first");
                });
            }
        }
    });
}]);


cart.controller('CartCtrl',
                function ($scope, $firebaseObject, $firebaseArray, Ref, Auth) {

    Auth.$onAuth(function (authData) {
        $scope.authData = authData;

        if (authData) {

            $scope.quantity = $firebaseObject(Ref.child("user/" + authData.uid + "/quantity"));

            var objCart = $firebaseArray(Ref.child("cart/" + authData.uid)), cartO = $firebaseObject(Ref.child("cart/" + authData.uid));
            objCart.$loaded().then(function (data) {
                $scope.cart = data;

                $scope.total = 0;
                for (var i = 0; i < data.length; ++i)
                    $scope.total += data[i].price * data[i].number;
            });

            $scope.updateItem = function (index) {
                $scope.cart.$save(index);

                $scope.total = 0;
                for (var i = 0; i < $scope.cart.length; ++i)
                    $scope.total += $scope.cart[i].price * $scope.cart[i].number;

                var item = $(".item-row");

                item[index].className += " animated rubberBand";


                setTimeout(function () {
                    item[index].className = item[index].className.replace(" animated rubberBand", "");
                }, 1500);

            }

            $scope.removeItem = function (index) {
                if ($scope.quantity.$value > 0) {
                    $scope.quantity.$value = $scope.quantity.$value - 1;
                    $scope.quantity.$save();

                    var item = $(".item-row");
                    item[index].className += " animated flipOutY";

                    setTimeout(function () {
                        objCart.$remove(index);
                        //$scope.data.item.splice(index, 1);
                        //$scope.$apply();
                    }, 1000);
                }
            };


            $scope.checkout = function () {

                var a = contactForm.email.$valid;
                var b = contactForm.email.$error;

                if (typeof $scope.name === "undefined") {
                    alert("Invalid name");
                    return;
                }
                if (typeof $scope.phone === "undefined") {
                    alert("Invalid phone number");
                    return;
                }
                //if (!$scope.email.$valid) {
                if (typeof $scope.email === "undefined") {
                    alert("Invalid email");
                    return;
                }
                if (typeof $scope.address === "undefined") {
                    alert("Invalid address");
                    return;
                }

                var checkout = {};
                checkout.receiver = { "name": $scope.name, "phone": $scope.phone, "email": $scope.email, "address": $scope.address };
                checkout.item = angular.copy(cartO);
                delete checkout.item.$id;
                delete checkout.item.$priority;
                delete checkout.item.$$conf;
                
                var today = new Date();

                var objCheckout = $firebaseArray(Ref.child("user/" + authData.uid + "/history"));
                var objOrder = $firebaseArray(Ref.child("order/" + authData.uid));

                objCheckout.$add(checkout);
                objOrder.$add(checkout);
                //var obj = $firebaseObject(ref);
                //obj.data.push(checkout);
                //obj.$apply();

                //$scope.data = 0;
                $scope.name = "";
                $scope.phone = "";
                $scope.email = "";
                $scope.address = "";
                //$scope.$apply();

                $scope.cart = 0;
                for (var i = 0; i < objCart.length; ++i)
                    $scope.removeItem(i);

                alert("Your order has been submitted\nWe'll contact you ASAP to delivery your order");
            };
        }
    });
});