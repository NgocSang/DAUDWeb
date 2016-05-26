var prodGallery = jQblvg.parseJSON('{"prod_1":{"main":{"orig":"images/0001-2.jpg","main":"images/large/0001-2.jpg","thumb":"images/small/0001-2.jpg","label":""},"gallery":{"item_0":{"orig":"images/0001-2.jpg","main":"images/large/0001-2.jpg","thumb":"images/small/0001-2.jpg","label":""},"item_1":{"orig":"images/0001-1.jpg","main":"images/large/0001-1.jpg","thumb":"images/small/0001-1.jpg","label":""},"item_2":{"orig":"images/0001-5.jpg","main":"images/large/0001-5.jpg","thumb":"images/small/0001-5.jpg","label":""},"item_3":{"orig":"images/0001-3.jpg","main":"images/large/0001-3.jpg","thumb":"images/small/0001-3.jpg","label":""},"item_4":{"orig":"images/0001-4.jpg","main":"images/large/0001-4.jpg","thumb":"images/small/0001-4.jpg","label":""}},"type":"simple","video":false}}'),
    gallery_elmnt = jQblvg('.product-img-box'),
    galleryObj = new Object(),
    gallery_conf = new Object();
gallery_conf.moreviewitem = '<a class="cs-fancybox-thumbs" data-fancybox-group="thumb" style="width:64px;height:85px;" href=""  title="" alt=""><img src="" src_main="" width="64" height="85" title="" alt="" /></a>';
gallery_conf.animspeed = 200;
jQblvg(document).ready(function() {
    galleryObj[1] = new prodViewGalleryForm(prodGallery, 'prod_1', gallery_elmnt, gallery_conf, '.product-image', '.more-views', 'http:');
    jQblvg('.product-image .cs-fancybox-thumbs').absoluteClick();
    jQblvg('.cs-fancybox-thumbs').fancybox({ prevEffect : 'none', 
                                            nextEffect : 'none',
                                            closeBtn : true,
                                            arrows : true,
                                            nextClick : true, 
                                            helpers: {
                                                thumbs : {
                                                    width: 64,
                                                    height: 85,
                                                    position: 'bottom'
                                                }
                                            }
                                           });
    jQblvg('#wrap').css('z-index', '100');
    jQblvg('.more-views-container').elScroll({type: 'vertical', elqty: 4, btn_pos: 'border', scroll_speed: 400 });

});

function initGallery(a,b,element) {
    galleryObj[a] = new prodViewGalleryForm(prods, b, gallery_elmnt, gallery_conf, '.product-image', '.more-views', '');
};
$(document).ready(function($) {
    $(".scroll").click(function(event){		
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1200);
    });
});