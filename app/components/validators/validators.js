/*global angular, $*/
var mdl = angular.module("App.validators", []);

mdl.directive('matchValue', function () {
    'use strict';

    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=matchValue"
        },
        link: function (scope, element, attributes, ngModel) {
            
            ngModel.$validators.matchValue = function (modelValue, viewValue) {
                if (!scope.otherModelValue || !modelValue) {
                    return true;
                }
                
                return modelValue === scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});