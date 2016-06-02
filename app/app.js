/*global angular, turnOffLogin, turnOffCreate*/
// Declare app level module which depends on views, and components
var app = angular.module('App', ['firebase', 'ngRoute', 'App.store', 'App.cart', 'App.services', 'App.contact', 'App.details', 'App.home', 'App.providers']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);

app.controller("IndexCtrl", function ($scope, $firebaseObject, $firebaseAuth, Auth, $anchorScroll, Ref) {
    'use strict';
    
    Auth.$onAuth(function (authData) {
        $scope.authData = authData;
        
        if (authData) {
            $scope.quantity = $firebaseObject(Ref.child("user/" + authData.uid + "/quantity"));
            $scope.quantity.$loaded().then(function () {
                if (!$scope.quantity.$value) {
                    $scope.quantity.$value = 0;
                    $scope.quantity.$save();
                }
            });
            
            
            //uidAuth.setUid(authData.uid);
            
            switch (authData.provider) {
            case "facebook":
                $scope.userName = $scope.authData.facebook.displayName;
                break;
            case "google":
                $scope.userName = $scope.authData.google.displayName;
                break;
            case "twitter":
                $scope.userName = $scope.authData.twitter.displayName;
                break;
            case "password":
                var userName = $firebaseObject(Ref.child("user/" + authData.uid + "/name"));
                userName.$loaded().then(function () {
                    $scope.userName = userName.$value;
                });
                break;
            }
        }
    });
    
    $scope.loginEmail = function () {
        Auth.$authWithPassword($scope.credential).then(function (authData) {
            //uidAuth.setUid(authData.uid);
            turnOffLogin();
        })["catch"](function (error) {
            window.alert("Invalid info");
        });
    };
    
    $scope.loginFacebook = function () {
        Auth.$authWithOAuthPopup("facebook");
    };
    
    $scope.loginGoogle = function () {
        Auth.$authWithOAuthPopup("google").then(function (authData) {
            //uidAuth.setUid(authData.uid);
        });
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
            Auth.$createUser($scope.createData).then(function (authData) {
                var userName = $firebaseObject(Ref.child("user/" + authData.uid + "/name"));
                userName.$value = $scope.createData.name;
                userName.$save();
                turnOffCreate();
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
    };
    
    $scope.scrollToTop = function () {
        $anchorScroll("topwebsite");
    };
});








app.service('uidAuth', function ($firebaseObject, $firebaseArray) {

    var uid;


    var getUid = function () {
        return uid;
    };


    var setUid = function (uid) {
        uid = uid.replace(":", "");
        this.uid = uid;

        var ref = new Firebase("https://fuckfirebase.firebaseio.com/cart/" + uid);
        ref.on("value", function (snapshot) {
            var item = snapshot.val();
            if (item === null)
            {
                var ref = new Firebase("https://fuckfirebase.firebaseio.com/cart/");
                var obj = ref.child(uid);
                obj.set(0);
            }
            
        });
        //var item = {};
        //item[uid] = 1;
        //obj.set(item);

        //var ref = new Firebase("https://das-shop.firebaseio.com/cart/");
        //var obj = ref.child(uid);
        //obj.set(0);
    };

    return {
        getUid: getUid,
        setUid: setUid
    };
});