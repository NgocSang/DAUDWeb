/*global angular*/
var store = angular.module('App.details', ['ngRoute', 'firebase', 'App.providers', 'App.filters']);

store.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.when('/store/details/:id', {
        templateUrl: 'details/details.html',
        controller: 'DetailsCtrl'
    });
}]);

store.controller('DetailsCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Auth, Ref, AuthData) {
    'use strict';
    
    $scope.authData = AuthData;
    
    Auth.$onAuth(function (authData) {
        if (authData) {
            $scope.cart = $firebaseObject(Ref.child("cart/" + authData.uid + "/" + $routeParams.id));
            $scope.review = $firebaseObject(Ref.child("productDetail/"  + $routeParams.id + "/reviews/" + authData.uid));
        }
    });
    
    $scope.product = {
        basicInfo: $firebaseObject(Ref.child("products/" + $routeParams.id + "/basicInfo")),
        detail: $firebaseObject(Ref.child("productDetail/" + $routeParams.id + "/detail")),
        color: $firebaseArray(Ref.child("products/" + $routeParams.id + "/color")),
        size: $firebaseArray(Ref.child("products/" + $routeParams.id + "/size")),
        imgUrl: $firebaseArray(Ref.child("productDetail/" + $routeParams.id + "/imgUrl").limitToFirst(4)),
        reviews: $firebaseArray(Ref.child("productDetail/" + $routeParams.id + "/reviews"))
    };
    
    $scope.changeImg = function (index) {
        $scope.product.largeImg = $scope.product.imgUrl.$getRecord(index);
    };
    
    $scope.product.imgUrl.$loaded().then(function () {
        $scope.changeImg(0);
    });
    
    $scope.addToCart = function () {
    
          var ref = new Firebase("https://fuckfirebase.firebaseio.com/products/" + $routeParams.id);

                    var obj = $firebaseObject(ref);
         obj.color = $scope.product.color;
        obj.basicInfo = $scope.product.basicInfo;
        obj.size = $scope.product.size;
        obj.$save();
        
        
         var refDetail = new Firebase("https://fuckfirebase.firebaseio.com/productDetail/" + $routeParams.id);
        var objDetail = $firebaseObject(refDetail);
        objDetail.detail = $scope.product.detail;
        objDetail.imgUrl = $scope.product.imgUrl;
objDetail.$save();
    };
    
    $scope.addReview = function () {
        if ($scope.authData.data) {
            $scope.review.name = $scope.authData.name;
            $scope.review.avatar = $scope.authData.avatar;
            $scope.review.$save();
        } else {
            window.alert("Please login first!");
        }
    };
    
    
    
    
   filepicker.setKey("ADYHQMOM0RQCsBxO1R6kQz");

    $scope.browseImage = function () {
        filepicker.pickMultiple(
            {
                mimetype: 'image/*',
                services: ['COMPUTER', 'WEBCAM', 'FACEBOOK', 'IMAGE_SEARCH', 'URL'],
                conversions: ['crop', 'rotate', 'filter']
            },
        function (img)  // image loaded
        {
            //product.imgUrl = [];   // list images
            /*for (var i = 0; i < img.length; ++i)
                $scope.product.$add(img[i].url);    // get url of each image

            $scope.$apply();*/
            
            
            
            var ref = new Firebase("https://fuckfirebase.firebaseio.com/productDetail/" + $routeParams.id + "/imgUrl");
            var obj = $firebaseArray(ref);
            for (var i = 0; i < img.length; ++i){
                obj.$add(img[i].url);    // get url of each image
                $scope.product.imgUrl.push(img[i].url);
            }
        });
    }
    
    
    
    
    
    $scope.removeItem = function()
    {
        
    }

});