$(function () {

    //SVG Fallback
    if (!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function () {
            return $(this).attr("src").replace(".svg", ".png");
        });
    }
    

    $("img, a").on("dragstart", function (event) { event.preventDefault(); });

});

$(document).ready(function () {
    // Animations
    $(".promo__title").animated("fadeInDown");
    $(".promo__text").animated("fadeInUp");
    $(".promo__call").animated("fadeInUp");
    $(".work").animated("fadeInDown");
    $(".process__tab").animated("fadeInDown");
    $(".experts__devs").animated("fadeInLeft");
    $(".experts__clients").animated("fadeInRight");
    $(".portfolio__carousel").animated("fadeInUp");
    $(".testimonials__comment").animated("fadeInUp");

    // Full height block
    function heightDetect () {
        if ($(window).width() > 992) {
            $(".promo").css("height", $(window).height());
        } else {
            $(".promo").css("height", "auto");
        }
        
        $(".popup").css("height", "100vh");
        // if($(window).width()<1025){
        // 	if($(window).width()>$(window).height()){
        // 		$(".popup").css("height", screen.availWidth);
        // 	};
        // };
    }
    heightDetect();
    $(window).resize(function () {
        heightDetect();
    });
    //Disable scroll
    function disable_scroll () {
        document.ontouchmove = function (e) {
            e.preventDefault();
        }
    }

    function enable_scroll () {
        document.ontouchmove = function (e) {
            return true;
        }
    }

    // Popup menu
    $(".js__menu").click(function () {
        if ($(".popup").is(":visible")) {
            $(".popup").fadeOut(600);
            $(".promo__menu").removeClass("active");
            $(".promo__logo").removeClass("active");
            $(".app__tabs").css("z-index", "500");
            enable_scroll();
            $("html").css('height', 'auto').css('overflow-y', 'scroll');
        } else {
            $(".popup").fadeIn(600);
            $(".promo__menu").addClass("active");
            $(".promo__logo").addClass("active");
            $(".app__tabs").css("z-index", "10");
            disable_scroll();
            $("html").css('height', '100%').css('overflow-y', 'hidden');
        }
    });

    //Input active
    $(".contact__wrap input").focus(function () {
        let link = $(this).parent();
        $(link).find("label").css({"top": "-14px", "font-size": "12px", "color": "#aeaeae"});
    });

    $(".contact__wrap textarea").focus(function () {
        let link = $(this).parent();
        $(link).find("label").css({"top": "-24px", "font-size": "12px", "color": "#aeaeae"});
    });

    //Mobile app carousel
    $(".app__carousel").owlCarousel({
        items: 1,
        autoplay: false,
        autoplayTimeout: 5000,
        URLhashListener: true,
        startPosition: 'first',
        // animateIn:'fadeIn',
        // animateOut:'fadeOut',
        mouseDrag: false,
        smartSpeed: 300,
        dots: false,
    });

    //Active tab
    $(".app .app__carousel").on("translate.owl.carousel", function (event) {
        var atribute = $(".owl-item.owl-animated-in .app__content").attr("data-hash");
        $(".app__tabs .app__tab").removeClass("app__tab--active");
        var x = document.getElementsByClassName(atribute);
        $(x).addClass("app__tab--active");
    });
    $(".app .app__carousel").on("translated.owl.carousel", function (event) {
        var atribute = $(".owl-item.active .app__content").attr("data-hash");
        $(".app__tabs .app__tab").removeClass("app__tab--active");
        var x = document.getElementsByClassName(atribute);
        $(x).addClass("app__tab--active");
    });

    //Mobile footer links
    $(".contact .app__tabs a").click(function () {
        $('html, body').animate({
            scrollTop: $(".app").offset().top + 220
        }, 500);
    });

    //Footer device links
    $(".contact__footer .device a").click(function () {
        $('html, body').animate({
            scrollTop: $(".app").offset().top + 220
        }, 500);
    });

    //Portfolio carousel
    $(".portfolio__carousel").owlCarousel({
        items: 1,
        autoplay: false,
        autoplayTimeout: 5000,
        URLhashListener: true,
        startPosition: 'first',
        // animateIn:'fadeIn',
        // animateOut:'fadeOut',
        mouseDrag: false,
        smartSpeed: 300,
        dots: true,
    });
    //Call to scroll
    $("a.scrollto").click(function () {
        $('html, body').animate({
            scrollTop: $(".contact").offset().top
        }, 500);
    });

    $("a.arrow").click(function () {
        $('html, body').animate({
            scrollTop: $(".app").offset().top
        }, 500);
    });

    //Menu items scroll
    $(".popup a").click(function () {
        var linked = $(this).attr("href");
        $(".popup").fadeOut(600);
        $(".promo__menu").removeClass("active");
        $(".promo__logo").removeClass("active");
        $("html").css('height', 'auto').css('overflow-y', 'scroll');
        enable_scroll();
        $('html, body').animate({
            scrollTop: $(linked).offset().top
        }, 500);
    });

    //Open hidden content on apps
    $(".app__content .js--open").click(function () {
        $(".app__content .js--open").toggleClass("opened");
        $(".app__content .js--hide").toggle();
    });

    //Open hidden content on portfolio
    $(".portfolio__test .js--open").click(function () {
        $(".portfolio__test .js--open").toggleClass("opened");
        $(".portfolio__test .js--hide").toggle();
    });
});
//@prepros-append contact.js
//@prepros-append country.js
//@prepros-append form_validate.js
//@prepros-append assets/owl.carousel.js

function getGAClientId () {
    try {
        var tracker = ga.getAll()[0];
        return tracker.get('clientId');
    } catch (e) {
        console.log("Error fetching clientId");
        return '';
    }
}
$(window).load(function () {
    getGAClientId();
    dataLayer.push({'cid': getGAClientId(), 'event': 'сidReady'});
});
