'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('App', ['firebase', 'ngRoute', 'App.store', 'App.cart', 'App.services','App.contact','App.details']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise(
        {
            redirectTo: '/store'
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
                $scope.user.name = "sang cho";
                break;
        }
    });

    $scope.loginEmail = function () {
        $scope.auth.$authWithPassword($scope.credential);
        turnOffLogin();
    };

    $scope.loginFacebook = function () {
        $scope.auth.$authWithOAuthPopup("facebook");
    };

    $scope.loginGoogle = function () {
        $scope.auth.$authWithOAuthPopup("google");
    };

    $scope.loginTwitter = function () {
        $scope.auth.$authWithOAuthPopup("twitter");
    };

    $scope.logout = function () {
        $scope.auth.$unauth();
    };

    $scope.createUser = function () {
        if ($scope.createData.password !== $scope.confirm) {
            alert("Mật khẩu không khớp!")
        }
        else {
            $scope.auth.$createUser($scope.createData).then(function () {
                alert("Tạo tài khoản thành công");
            }).catch(function (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        alert("Email này đã được sử dụng");
                        break;
                    case "INVALID_EMAIL":
                        alert("Email không hợp lệ");
                        break;
                    default:
                        alert("Lỗi không thể tạo tài khoản: " + error);
                }
            })
        }
        turnOffCreate();
    };
});
