/*global angular, turnOffLogin, turnOffCreate*/
// Declare app level module which depends on views, and components
var app = angular.module('App', ['firebase', 'ngRoute', 'App.store', 'App.cart', 'App.services', 'App.contact', 'App.details', 'App.history', 'App.home', 'App.providers', 'App.validators']);
var imgCtrl;
app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);

app.controller("IndexCtrl", function ($scope, $firebaseObject, $firebaseArray, $firebaseAuth, Auth, $anchorScroll, Ref, AuthData, Global) {
    'use strict';
    imgCtrl = $scope;
    $scope.tag = $firebaseArray(Ref.child("tag"));
    $scope.authData = AuthData;
    $scope.search = Global;
    
    $scope.loginEmail = function () {
        Auth.$authWithPassword($scope.credential).then(function () {
            turnOffLogin();
        })["catch"](function (error) {
            window.alert("Invalid info");
        });
    };
    
    $scope.loginFacebook = function () {
        Auth.$authWithOAuthPopup("facebook");
    };
    
    $scope.loginGoogle = function () {
        Auth.$authWithOAuthPopup("google");
    };
    
    $scope.loginTwitter = function () {
        Auth.$authWithOAuthPopup("twitter");
    };
    
    $scope.logout = function () {
        Auth.$unauth();
    };
    
    $scope.createUser = function () {
        if ($scope.createData.password !== $scope.createData.confirm) {
            window.alert("Password not match");
        } else {
            Auth.$createUser($scope.createData).then(function (authData1) {
                turnOffCreate();
                
                return Auth.$authWithPassword({
                    "email": $scope.createData.email,
                    "password": $scope.createData.password
                });
            }).then(function (authData2) {
                var user = $firebaseObject(Ref.child("user/" + authData2.uid + "/info"));

                user.$loaded().then(function () {
                    user.name = $scope.createData.name;
                    //user.avatar = "http://studymovie.net/Cms_Data/Sites/admin/Themes/Default/images/default-avatar.jpg";
                    user.avatar = "https://cdn.filestackcontent.com/rDrJFjYNTKmo6G4F0FHY"
                    user.$save().then(function () {
                        AuthData.doAuth(authData2);
                    });
                });
            })["catch"](function (error) {
                window.alert("Error");
            });
        }
    };
    
    $scope.scrollToTop = function () {
        $anchorScroll("topwebsite");
    };
    
    // load service
    var obj = $firebaseObject(Ref.child("service"));
    obj.$bindTo($scope, "service");
});