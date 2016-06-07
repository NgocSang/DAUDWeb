var login = angular.module('App.login', ['ngRoute', 'firebase', 'App.providers']);

login.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}]);

store.controller('LoginCtrl', function ($scope, $firebaseArray, Ref) {
    'use strict';    
    
   
    
    
});