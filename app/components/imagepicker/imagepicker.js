function ImagePickerController($scope, $firebaseObject, Ref, AuthData) {

    filepicker.setKey("A0tLkm81fRyGmg7JlmqJez");

    $scope.browseImage = function () {
        filepicker.pickMultiple(
            {
                mimetype: 'image/*',
                services: ['COMPUTER', 'WEBCAM', 'FACEBOOK', 'IMAGE_SEARCH', 'URL'],
                conversions: ['crop', 'rotate', 'filter']
            },
            function (img)  // image loaded
            {
                imgCtrl.imgList = [];   // list images
                for (var i = 0; i < img.length; ++i)
                    imgCtrl.imgList[i] = img[i].url;    // get url of each image

                imgCtrl.$apply();
                imgCtrl.authData = AuthData;
                var user = $firebaseObject(Ref.child("user/" + imgCtrl.authData.data.uid + "/info"));
                user.$loaded().then(function (){
                    user.avatar = imgCtrl.imgList[0];
                    window.alert(imgCtrl.imgList[0]);
                    user.$save().then(function(){
                        imgCtrl.authData.avatar = user.avatar
                    });
                });

            });
    }
}

app.component('imagepicker', {
    templateUrl: 'components/imagepicker/imagepicker.html',
    controller: ImagePickerController
});
