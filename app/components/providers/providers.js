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

mdl.factory("AuthData", function (Ref, Auth, $firebaseObject) {
    'use strict';
    
    var authData = {
        doAuth: function (data) {
            authData.data = data;
            
            if (data) {
                authData.quantity = $firebaseObject(Ref.child("user/" + data.uid + "/quantity"));
                authData.quantity.$loaded().then(function () {
                    if (!authData.quantity.$value) {
                        authData.quantity.$value = 0;
                        authData.quantity.$save();
                    }
                });

                switch (data.provider) {
                case "facebook":
                    authData.name = data.facebook.displayName;
                    authData.avatar = data.facebook.profileImageURL;
                    break;
                case "google":
                    authData.name = data.google.displayName;
                    authData.avatar = data.google.profileImageURL;
                    break;
                case "twitter":
                    authData.name = data.twitter.displayName;
                    authData.avatar = data.twitter.profileImageURL;
                    break;
                case "password":
                    var user = $firebaseObject(Ref.child("user/" + data.uid + "/info"));
                    
                    user.$loaded().then(function () {
                        authData.name = user.name;
                        authData.avatar = user.avatar;
                    });
                    
                    break;
                }
            } else {
                authData.quantity = null;
            }
        }
    };
    
    Auth.$onAuth(authData.doAuth);
    
    return authData;
});

mdl.factory("Global", function () {
    'use strict';
    
    return {};
});