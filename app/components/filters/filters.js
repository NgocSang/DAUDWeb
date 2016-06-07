/*global angular*/
var mdl = angular.module("App.filters", ["firebase"]);

mdl.filter('myFilter', function () {
    'use strict';

    return function (items, object, isStrict) {
        try {
            var keys = Object.keys(object),
                i,
                len1,
                rs = items,
                checkS = function (element, index, array) {
                    return element[keys[i]].hasOwnProperty(object[keys[i]]);
                },
                checkL = function (element, index, array) {
                    var strings = Object.keys(element[keys[i]]), j, len2;

                    for (j = 0, len2 = strings.length; j < len2; j = j + 1) {
                        if (strings[j].toLowerCase().indexOf(object[keys[i]].toLowerCase()) >= 0) {
                            return true;
                        }
                    }

                    return false;
                };

            for (i = 0, len1 = keys.length; i < len1; i = i + 1) {
                if (object[keys[i]] !== "") {
                    if (isStrict[keys[i]]) {
                        rs = rs.filter(checkS);
                    } else {
                        rs = rs.filter(checkL);
                    }
                }
            }

            return rs;
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

mdl.filter('star', function () {
    'use strict';
    
    return function (input) {
        switch (input) {
        case 1:
            return '\u2605 \u2606 \u2606 \u2606 \u2606';
        case 2:
            return '\u2605 \u2605 \u2606 \u2606 \u2606';
        case 3:
            return '\u2605 \u2605 \u2605 \u2606 \u2606';
        case 4:
            return '\u2605 \u2605 \u2605 \u2605 \u2606';
        case 5:
            return '\u2605 \u2605 \u2605 \u2605 \u2605';
        }
        
        return '\u2606 \u2606 \u2606 \u2606 \u2606';
    };
});