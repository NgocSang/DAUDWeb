/*global angular*/
var mdl = angular.module("App.filters", ["firebase"]);

mdl.filter('strictA', function () {
    'use strict';
    
    return function (items, object, attr) {
        try {
            if (object[attr] === "") {
                return items;
            }

            return items.filter(function (element, index, array) {
                return element[attr] === object[attr] || element[attr].indexOf(object[attr]) >= 0;
            });
        } catch (error) {
            return items;
        }
    };
});

mdl.filter('price', function () {
    'use strict';
    
    return function (items, choice) {
        try {
            if (choice === "") {
                return items;
            }

            return items.filter(function (element, index, array) {
                var price = element.basicInfo.price;
            
                switch (choice) {
                case "1":
                    return price <= 200000;
                case "2":
                    return price <= 500000 && price > 200000;
                case "3":
                    return price <= 1000000 && price > 500000;
                case "4":
                    return price > 1000000;
                default:
                    return true;
                }
            });
        } catch (error) {
            return items;
        }
    };
});