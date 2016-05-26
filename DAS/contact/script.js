function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 10.762648, lng: 106.682325},
        zoom: 20
    });
}