var newproduct = angular.module('App.addproduct', ['ngRoute', 'firebase', 'App.providers']);
var imgCtrl;
newproduct.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/new', {
        templateUrl: 'addproduct/addproduct.html',
        controller: 'AddproductCtrl',
        resolve: {
            checkAdmin: function (AdminCheck) {
                return AdminCheck.check();
            }
        }
    });
}]);

newproduct.controller('AddproductCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Ref) {
    imgCtrl = $scope;
    $scope.sizes = $firebaseArray(Ref.child("size"));
    $scope.productDetail = {
        detail: {},
        imgUrl: []
    };
    
    $scope.tag = $firebaseArray(Ref.child("tag"));
    
    $scope.transaction = function (ref) {
        var newId = ref.key();
        
        $scope.productDetail.imgUrl = [];
        for( var i = 0 ; i < imgCtrl.imgList.length; i++) {
            $scope.productDetail.imgUrl.push(imgCtrl.imgList[i]);
        }
        
        $scope.arrayAddUpdate($scope.productDetailO, $scope.productDetail, newId);
    };
        
    $scope.arrayAdd = function (arrayA, object, yourFunction) {
        if (typeof object === "undefined" || object === null) {
           window.alert("Error!");
           return;
        }
        
        object.basicInfo.imgUrl = imgCtrl.imgList[0];
        
        arrayA.$add(object).then(yourFunction)["catch"](function (error) {
            window.alert(error);
        });
    };
    
    
});