'use strict';

var cart = angular.module('App.cart', ['ngRoute', 'App.providers']);

cart.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'cart/cart.html',
    controller: 'CartCtrl'
  });
}]);




cart.controller('CartCtrl',
    function ($scope, $firebaseObject, $firebaseArray, Ref, Auth) {

        //var refCart = new Firebase("https://fuckfirebase.firebaseio.com/cart/" + uidAuth.uid);
        //var objCart = $firebaseArray(refCart);


        //objCart.$loaded().then(function (data) {
        //    $scope.data = data;
        //});



        Auth.$onAuth(function (authData) {
            $scope.authData = authData;

            if (authData) {

                $scope.quantity = $firebaseObject(Ref.child("user/" + authData.uid + "/quantity"));


                var refCart = new Firebase("https://fuckfirebase.firebaseio.com/cart/" + authData.uid);
                var objCart = $firebaseArray(refCart);
                objCart.$loaded().then(function (data) {
                    $scope.cart = data;

                    $scope.total = 0;
                    for (var i = 0; i < data.length; ++i)
                        $scope.total += data[i].price + data[i].number;
                });
                
                

$scope.updateItem = function (index) {
    var a = 1;
    //$scope.cart[index].number = 1;
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
                        alert("Tên không hợp lệ");
                        return;
                    }
                    if (typeof $scope.phone === "undefined") {
                        alert("Số điện thoại không hợp lệ");
                        return;
                    }
                    //if (!$scope.email.$valid) {
                    if (typeof $scope.email === "undefined") {
                        alert("Email không hợp lệ");
                        return;
                    }
                    if (typeof $scope.address === "undefined") {
                        alert("Địa chỉ không hợp lệ");
                        return;
                    }



                    var checkout = {};
                    checkout.user = { "name": $scope.name, "phone": $scope.phone, "email": $scope.email, "address": $scope.address };
                    checkout.item = $scope.data;


                    var refCheckout = new Firebase("https://das-shop.firebaseio.com/checkout");

                    var objCheckout = $firebaseArray(refCheckout);
                    objCheckout.$add(checkout);
                    //var obj = $firebaseObject(ref);
                    //obj.data.push(checkout);
                    //obj.$apply();

                    //$scope.data = 0;
                    $scope.name = "";
                    $scope.phone = "";
                    $scope.email = "";
                    $scope.address = "";
                    //$scope.$apply();

                    $scope.data = 0;
                    for (var i = 0; i < objCart.length; ++i)
                        $scope.removeItem(i);
                    //objCart.$remove(i);
                    //            objCart.$save(0);

                    alert("Đơn đặt hàng của bạn đã được lưu lại\nChúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất để giao hàng");
                };
            }
        });


    }
);