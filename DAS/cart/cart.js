'use strict';

var cart = angular.module('App.cart', ['ngRoute']);

cart.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'cart/cart.html',
    controller: 'CartCtrl'
  });
}]);




var refC;
cart.controller('CartCtrl', 
    function ($scope, $firebaseObject, $firebaseArray, uidAuth) {

        var ref = new Firebase("https://das-shop.firebaseio.com/cart/" + uidAuth.getUid());
        var obj = $firebaseObject(ref);
        obj.$bindTo($scope, "data").then(function () {
            //var item = $("tr");
            //for (var i = 0; i < item.length; ++i)
            //    item[i].className += "animated bounceInDown";
            //item[i].style.webkitAnimationDuration = (i + 3) + 's';
            //item[i].style.animationDuration = (i + 3) + 's';
        });

        //var uid = 1215534412;
        //refC = new Firebase("https://das-shop.firebaseio.com/cart").startAt(uid).endAt(uid).once('value', function (snap){
        //    var a = snap.val();

        //    var obj = $firebaseObject(refC);
        //    obj.$bindTo($scope, "data");
        //}) ;


        $scope.removeItem = function (index) {
            var item = $(".item-row");
            item[index].className += " animated flipOutY";

            setTimeout(function () {
                $scope.data.item.splice(index, 1);
                $scope.$apply();
            }, 2000);
        }


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
            checkout.item = $scope.data.item;



            var ref = new Firebase("https://das-shop.firebaseio.com/checkout");
            
            var obj = $firebaseArray(ref);
            obj.$add(checkout);
            //var obj = $firebaseObject(ref);
            //obj.data.push(checkout);
            //obj.$apply();

            $scope.data.item = [];
            $scope.$apply();


            $scope.name = "";
            $scope.phone = "";
            $scope.email = "";
            $scope.address = "";

            alert("Đơn đặt hàng của bạn đã được lưu lại\nChúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất để giao hàng");
        }
    }
);