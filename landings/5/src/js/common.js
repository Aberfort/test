var utils = window.fizzyUIUtils;

$(function() {

    //Img drag off
    $("img, a").on("dragstart", function(event) { event.preventDefault(); });

    //Case Slider
    var elem = document.querySelector('.cases__carousel');
    var flkty = new Flickity( elem, {
        // options
        cellAlign: 'center',
        contain: true,
        pageDots: true,
        loop: true,
        arrowShape: {
            x0: 15,
            x1: 65, y1: 45,
            x2: 75, y2: 45,
            x3: 25
        }
    });
    for(var i = 0; i < 3; i++){
        document.querySelectorAll('.cases__slide')[i].classList.add('cases__slide--js');
    }
    flkty.on( 'cellSelect', function() {
        for(var i = 0; i < 9; i++){
            document.querySelectorAll('.cases__slide')[i].classList.remove('cases__slide--js');
        }
        var sliders = document.querySelectorAll('.cases__item')[flkty.selectedIndex].querySelectorAll('.cases__slide');
        console.log(sliders);
        for(var i = 0; i < 3; i++){
            sliders[i].classList.add('cases__slide--js');
        }
    });

    //Slider on mobile
    var elem_2 = document.querySelector('.expertise__carousel');
    var flkty_2 = new Flickity( elem_2, {
        // options
        cellAlign: 'center',
        //contain: true,
        pageDots: true,
        prevNextButtons: false
    });

    //App Slider
    var elem_3 = document.querySelector('.app__carousel');
    var flkty_3 = new Flickity( elem_3, {
        // options
        cellAlign: 'center',
        //contain: true,
        //pageDots: true,
        prevNextButtons: false
    });

    var buttonGroup = document.querySelector('.app__tabs');
    var buttons = utils.makeArray( buttonGroup.querySelectorAll('.app__tab') );

    for(var i = 0; i < 6; i++){
        document.querySelectorAll('.app__tab')[i].addEventListener('click', function( event ) {
            var index = utils.indexOf( buttons, event.target );
            flkty_3.select( index );
        });
    }

    flkty_3.on( 'cellSelect', function() {
        for(var i = 0; i < 6; i++){
            document.querySelectorAll('.app__tab')[i].classList.remove('app__tab--active');
        }
        document.querySelectorAll('.app__tab')[flkty_3.selectedIndex].classList.add('app__tab--active');
    })

});

$(document).ready(function() {

    // Full height block
    function heightDetect() {
        $(".popup").css("height", "100vh");
    }
    heightDetect();
    scrollMenu();
    $(window).resize(function() {
        heightDetect();
        scrollMenu();
    });

    //Disable scroll
    function disable_scroll() {
        document.ontouchmove = function(e){
            e.preventDefault();
        }
    }
    function enable_scroll() {
        document.ontouchmove = function(e){
            return true;
        }
    }

    // Popup menu
    $(".js__menu").click(function(){
        if ($(".popup").is(":visible")) {
            $(".popup").fadeOut(600);
            $(".promo__menu").removeClass("active");
            $(".promo__logo").removeClass("active");
            enable_scroll();
            $("html").css('height', 'auto').css('overflow-y', 'scroll');
        } else{
            $(".popup").fadeIn(600);
            $(".promo__menu").addClass("active");
            $(".promo__logo").addClass("active");
            disable_scroll();
            $("html").css('height', '100%').css('overflow-y', 'hidden');
        }
    });

    //Call to scroll
    $(".scrollto").click(function(){
        $('html, body').animate({
            scrollTop: $("#contact").offset().top - 50
        }, 500);
    });

    //Call to scroll
    $(".promo__arrow a").click(function(){
        $('html, body').animate({
            scrollTop: $("#about").offset().top - 50
        }, 500);
    });

    //Menu items scroll
    $(".popup a").click(function(){
        var linked = $(this).attr("href");
        $(".popup").fadeOut(600);
        $(".promo__menu").removeClass("active");
        $(".promo__logo").removeClass("active");
        $("html").css('height', 'auto').css('overflow-y', 'scroll');
        enable_scroll();
        $('html, body').animate({
            scrollTop: $(linked).offset().top - 50
        }, 500);
    });
    $(".promo__logo a").click(function(){
        $('html, body').animate({
            scrollTop: $(this).offset().top = 0
        }, 500);
    });
    $(".promo__navigation a").click(function(){
        var linked = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(linked).offset().top - 50
        }, 500);
    });

    //Scroll menu
    function scrollMenu() {
        window.onscroll=function(){
            if(window.innerWidth > 300){
                if($(window).scrollTop() > 5){
                    document.querySelector(".promo__stick").classList.add("promo__stick--js");
                } else{
                    document.querySelector(".promo__stick").classList.remove("promo__stick--js");
                }
            } else {
                document.querySelector(".promo__stick").classList.remove("promo__stick--js");
            }
            if($(window).scrollTop() > 400){
                for (var i = 0; i < 4; i++){
                    document.querySelectorAll(".about__ring")[i].classList.add("about__ring--active");
                }
            }
        }
    }

    scrollMenu();

    //Open hidden content on apps
    $(".app__content .js--open").click(function(){
        $(".app__content .js--open").toggleClass("opened");
        $(".app__content .js--hide").toggle();
    });

    //Open hidden content on portfolio
    $(".portfolio__test .js--open").click(function(){
        $(".portfolio__test .js--open").toggleClass("opened");
        $(".portfolio__test .js--hide").toggle();
    });
});

