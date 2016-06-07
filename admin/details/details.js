/*global angular*/
var store = angular.module('App.details', ['ngRoute', 'firebase', 'App.providers']);
var imgCtrl;
store.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/details/:id', {
        templateUrl: 'details/details.html',
        controller: 'DetailsCtrl',
        resolve: {
            checkAdmin: function (AdminCheck) {
                return AdminCheck.check();
            }
        }
    });
}]);

store.controller('DetailsCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Ref) {
    'use strict';
    
    imgCtrl =  $scope;
    $scope.id = $routeParams.id;
    $scope.sizes = $firebaseArray(Ref.child("size"));

    $scope.product = $firebaseObject(Ref.child("products/" + $routeParams.id));
    $scope.productDetail = $firebaseObject(Ref.child("productDetail/" + $routeParams.id));

    $scope.test = function(){    
        if(imgCtrl.imgList && imgCtrl.imgList[0]){
            $scope.product.basicInfo.imgUrl = imgCtrl.imgList[0];
        }
    };
});