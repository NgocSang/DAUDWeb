$(document).ready(function() {
    $("#owl-demo").owlCarousel({
        items : 4,
        lazyLoad : true,
        autoPlay : true,
        navigation : true,
        navigationText : ["",""],
        rewindNav : false,
        scrollPerPage : false,
        pagination : false,
        paginationNumbers: false,
    });
});

$(function() {
    $('#da-slider').cslider();
});