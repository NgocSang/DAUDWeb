/*global angular*/
var mdl = angular.module("App.providers", ["firebase"]);

mdl.factory("Ref", function () {
    'use strict';
    
    return new Firebase("https://doanungdungweb.firebaseio.com/");
});

mdl.factory("Auth", function (Ref, $firebaseAuth) {
    'use strict';
    return $firebaseAuth(Ref);
});