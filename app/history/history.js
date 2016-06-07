'use strict';

// window already have a variable named history

var checkout = angular.module('App.history', ['ngRoute', 'App.providers']);

checkout.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/history', {
        templateUrl: 'history/history.html',
        controller: 'HistoryCtrl',
        resolve: {
            "checkLogin": function (Auth, $location) {
                Auth.$requireAuth()["catch"](function (error) {
                    $location.url("home");
                    window.alert("Please login first");
                });
            }
        }
    });
}]);




checkout.controller('HistoryCtrl', function ($scope, $firebaseObject, $firebaseArray, Ref, Auth) {

    Auth.$onAuth(function (authData) {
        $scope.authData = authData;

        if (authData) {

            var obj = $firebaseArray(Ref.child("user/" + authData.uid + "/history"));
            obj.$loaded().then(function (data) {
                $scope.history = data
                for (var i = 0; i < data.length; ++i)
                {
                    $scope.history[i].total = 0;
                    for (var j = 0; j < $scope.history[i].item.length; ++j)
                    {
                        var item = $scope.history[i].item[j];
                        $scope.history[i].total += item.price * item.number;
                    }
                }
            });



        }
    });
});
