'use strict';

var services = angular.module('App.services', ['ngRoute']);

services.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/services', {
        templateUrl: 'services/services.html',
        controller: 'ServicesCtrl'
    });
}]);

var sv;
services.controller("ServicesCtrl", function ($scope, $firebaseObject, Ref) {
    //sv = $scope;
    $scope.show = false;
    var obj = $firebaseObject(Ref.child("service"));
    obj.$bindTo($scope, "data").then(function () {

    });


    $scope.onEnd = function () {
        //$(".ser-grid-list").index().css('-webkit-animation', 'bounceInDown 1s');
        var item = $(".ser-grid-list");
        for (var i = 1; i < item.length + 1; ++i) {
            $(".ser-grid-list:nth-child(" + i + ")").css("animation-delay", (i - 0.3 * i) + "s");
            //$(".ser-grid-list").index.css('-webkit-animation', 'bounceindown ' + (i + 1) + 's');
        }
    };

});


services.directive("repeatEnd", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});

services.animation('.ser-grid-list', ['$animateCss', function ($animateCss) {
    return {
        enter: function (element, doneFn) {
            var height = element[0].offsetHeight;
            return $animateCss(element, {
                from: { height: '0px' },
                to: { height: height + 'px' },
                duration: 1 // one second
            });
        }
    }
}]);