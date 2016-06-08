/*global angular, Firebase*/
var mdl = angular.module("App.providers", ["firebase"]);

mdl.factory("Ref", function () {
    'use strict';
    return new Firebase("https://doanungdungweb.firebaseio.com/");
});

mdl.factory("Auth", function (Ref, $firebaseAuth) {
    'use strict';
    return $firebaseAuth(Ref);
});

mdl.factory("AdminCheck", function (Auth, Ref, $location, $firebaseObject, $q) {
    'use strict';
    return {
        check: function () {
            var deferred = $q.defer();

            Auth.$requireAuth().then(function (data) {
                $firebaseObject(Ref.child("adminTest")).$loaded().then(function () {
                    deferred.resolve(data);
                })["catch"](function (error) {
                    Auth.$unauth();
                    window.alert("Not admin!");
                    $location.url("login");
                });
            })["catch"](function (error) {
                $location.url("login");
            });

            return deferred.promise;
        }
    };
});