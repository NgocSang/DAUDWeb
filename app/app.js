'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('App', ['firebase', 'ngRoute', 'App.store', 'App.cart', 'App.services','App.contact','App.details','App.home']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise(
        {
            redirectTo: '/home'
        });
}]);

app.controller("LoginCtrl", function ($scope, $firebaseAuth) {
    var ref = new Firebase("https://doanungdungweb.firebaseio.com");
    $scope.auth = $firebaseAuth(ref);
    
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
    
    $scope.auth.$onAuth(function (authData) {
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
    });
    
    $scope.loginEmail = function () {
        $scope.auth.$authWithPassword($scope.credential);
        turnOffLogin();
    };
    
    $scope.loginFacebook = function() {
        $scope.auth.$authWithOAuthPopup("facebook");
    };
    
    $scope.loginGoogle = function() {
        $scope.auth.$authWithOAuthPopup("google");
    };
    
    $scope.loginTwitter = function() {
        $scope.auth.$authWithOAuthPopup("twitter");
    };
    
    $scope.logout = function() {
        $scope.auth.$unauth();
    };
    
    $scope.createUser = function () {
        if ($scope.createData.password !== $scope.confirm) {
            window.alert("Mật khẩu không khớp!")
        } else {
            $scope.auth.$createUser($scope.createData);
            turnOffCreate();
        }
    };
});