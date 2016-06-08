var login = angular.module('App.login', ['ngRoute', 'firebase', 'App.providers']);

login.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl',
        resolve: {
            checkAdmin: function (Auth, Ref, $location, $firebaseObject, $q) {
                var deferred = $q.defer();
                
                Auth.$waitForAuth().then(function (data) {
                    if (data !== null) {
                        $firebaseObject(Ref.child("adminTest")).$loaded().then (function () {
                            $location.url("home");
                        })["catch"](function (error) {
                            Auth.$unauth();
                            window.alert("Not admin!");
                            deferred.reject("Not admin!"); 
                        });
                    } else {
                        deferred.resolve("Please login!"); 
                    }
                });
                
                return deferred.promise;
            }
        }
    });
}]);

login.controller('LoginCtrl', function () {
    'use strict';
    
});