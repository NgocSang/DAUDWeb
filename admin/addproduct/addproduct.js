var newproduct = angular.module('App.addproduct', ['ngRoute', 'firebase', 'App.providers', 'App.filters']);
var imgCtrl;
newproduct.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/new', {
        templateUrl: 'addproduct/addproduct.html',
        controller: 'AddproductCtrl'
    });
}]);

newproduct.controller('AddproductCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Auth, Ref, AuthData) {
    window.abc = $scope;
    imgCtrl = $scope;
    $scope.sizes = $firebaseArray(Ref.child("size"));
    $scope.productDetail = {
        detail: {},
        imgUrl: []
    };
    $scope.tag = $firebaseArray(Ref.child("tag")); // anh đang chat với thằng Quân, chú làm tiếp đi
    
    $scope.transaction = function (ref) {
        var newId = ref.key();
        
        for( var i = 0 ; i < imgCtrl.imgList.length; i++)
        {
            $scope.productDetail.imgUrl.push(imgCtrl.imgList[i]);
        }
        
        $scope.arrayAddUpdate($scope.productDetailO, $scope.productDetail, newId);
    };
    
        
    $scope.arrayAdd = function (arrayA, object, yourFunction) {
        object.basicInfo.imgUrl = imgCtrl.imgList[0];
//        if (typeof object === "undefined" || object === null) {
//           window.alert("Error!");
//           return;
//        }
       
//        var a = new Firebase("https://doanungdungweb.firebaseio.com/");
//        var b = a.child("products");
//        b.push($scope.product, function (error) {
//        if (error === null) {alert("Success");}
//        else {alert("Fail");}
//        });
        arrayA.$add(object).then(yourFunction)["catch"](function (error) {
            window.alert(error);
        });
    };
    
    
});