'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('App', ['firebase', 'ngRoute', 'App.store', 'App.cart', 'App.services', 'App.contact', 'App.details', 'App.home', 'App.providers']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise(
        {
            redirectTo: '/home'
        });
}]);

app.controller("LoginCtrl", function ($scope, $firebaseAuth, Auth) {
    var ref = new Firebase("https://doanungdungweb.firebaseio.com");
    
    $scope.credential = {
        "email": "",
        "password": ""
    }
    
    $scope.createData = {
        "email": "",
        "password": ""
    }
    
    $scope.user = {
        "name": ""
    }
    
    $scope.confirm = "";
    
    Auth.$onAuth(function (authData) {
        if (authData != null) {
            $scope.authData = authData;
        
            switch ($scope.authData.provider) {
                case "facebook":
                    $scope.user.name = $scope.authData.facebook.displayName;
                    break;
                case "google":
                    $scope.user.name = $scope.authData.google.displayName;
                    break;
                case "twitter":
                    $scope.user.name = $scope.authData.twitter.displayName;
                    break;
                case "password":
                    $scope.user.name = "sang";
                    break;
            }
        }
    });
    
    $scope.loginEmail = function () {
        Auth.$authWithPassword($scope.credential);
        turnOffLogin();
    };
    
    $scope.loginFacebook = function() {
        Auth.$authWithOAuthPopup("facebook");
    };
    
    $scope.loginGoogle = function() {
        Auth.$authWithOAuthPopup("google");
    };
    
    $scope.loginTwitter = function() {
        Auth.$authWithOAuthPopup("twitter");
    };
    
    $scope.logout = function() {
        Auth.$unauth();
    };
    
    $scope.createUser = function () {
        if ($scope.createData.password !== $scope.confirm) {
            window.alert("Mật khẩu không khớp!")
        } else {
            Auth.$createUser($scope.createData);
            turnOffCreate();
        }
    };
});