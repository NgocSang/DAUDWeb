var order = angular.module('App.order', ['ngRoute', 'firebase', 'App.providers']);

order.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/order', {
        templateUrl: 'order/order.html',
        controller: 'OrderCtrl'
    });
}]);

order.controller('OrderCtrl', function ($scope, $firebaseArray, Ref) {
    'use strict';    
    
   
    
    console.log($scope.orderA);
    
    $scope.deleteOrder = function (record, id) {
        record[id] = null;
        $scope.orderA.$save(record);
    };  
});

