var order = angular.module('App.order', ['ngRoute', 'firebase', 'App.providers']);

order.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/order', {
        templateUrl: 'order/order.html',
        controller: 'OrderCtrl',
        resolve: {
            checkAdmin: function (AdminCheck) {
                return AdminCheck.check();
            }
        }
    });
}]);

order.controller('OrderCtrl', function ($scope, $firebaseArray, Ref) {
    'use strict';
    
    $scope.deleteOrder = function (record, id) {
        Ref.child("order/" + record.$id + "/" + id).set(null);
    };  
});

