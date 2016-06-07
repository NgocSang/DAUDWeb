/*global angular*/
var store = angular.module('App.details', ['ngRoute', 'firebase', 'App.providers', 'App.filters']);
var imgCtrl;
store.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/details/:id', {
        templateUrl: 'details/details.html',
        controller: 'DetailsCtrl'
    });
}]);

store.controller('DetailsCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Auth, Ref, AuthData) {
    'use strict';
    imgCtrl =  $scope;
    $scope.authData = AuthData;
    $scope.id = $routeParams.id;
    $scope.sizes = $firebaseArray(Ref.child("size"));
    /*$scope.product = {
        basicInfo: $firebaseObject(Ref.child("products/" + $routeParams.id + "/basicInfo")),
        detail: $firebaseObject(Ref.child("productDetail/" + $routeParams.id + "/detail")),
        color: $firebaseArray(Ref.child("products/" + $routeParams.id + "/color")),
        size: $firebaseArray(Ref.child("products/" + $routeParams.id + "/size")),
        imgUrl: $firebaseArray(Ref.child("productDetail/" + $routeParams.id + "/imgUrl").limitToFirst(4))
    };*/
    $scope.product = $firebaseObject(Ref.child("products/" + $routeParams.id));
    $scope.productDetail = $firebaseObject(Ref.child("productDetail/" + $routeParams.id));
     console.log($scope.productDetail);
//    $scope.arrayAddUpdate = function(){
//        $scope.productBasic = {
//        basicInfo:{
//            name:$scope.product.basicInfo.name,
//            price:$scope.product.basicInfo.price,
//            tag:$scope.prodganuct.basicInfo.tag,
//            imgUrl:$scope.product.basicInfo.img
//        },
//        color:{
//            [$scope.product.color[0]]:$scope.product.color[0]
//        },
//        size:{
//            [$scope.product.color[0]]:$scope.product.size[0]
//        }
//    };
//    }
 $scope.test = function(){    
     if(imgCtrl.imgList && imgCtrl.imgList[0]){
        $scope.product.basicInfo.imgUrl = imgCtrl.imgList[0]}};
});