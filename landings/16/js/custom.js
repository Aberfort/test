// JavaScript Document

$(window).on('scroll', function () {

    "use strict";

    /*----------------------------------------------------*/
    /*	Navigtion Menu Scroll
     /*----------------------------------------------------*/

    var b = $(window).scrollTop();

    if (b > 60) {
        $(".navbar").addClass("scroll");
    } else {
        $(".navbar").removeClass("scroll");
    }

    /*----------------------------------------------------*/
    /*	Blue Circle Progress Bars
     /*----------------------------------------------------*/

    if ($().easyPieChart) {

        var count = 0;
        var colors = ['#25c6ff']; // Circle bar color

        $('.percentage').each(function () {

            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 600) {

                $(this).easyPieChart({
                    barColor: colors[count],
                    trackColor: 'rgba(20, 20, 20, .1)',
                    scaleColor: false,
                    scaleLength: false,
                    lineCap: 'butt',
                    rotate: 0,
                    lineWidth: 5,
                    size: 150,
                    animate: 1350,
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    }

                });

            }

            count++;
            if (count >= colors.length) {
                count = 0
            }
            ;

        });

    }

});

$(document).ready(function () {

    "use strict";

    /*----------------------------------------------------*/
    /*	Header Fixed on Top White Bg
     /*----------------------------------------------------*/

    var heHeight = $('#navigation-menu').css("height");
    if ($('.navbar').hasClass('bg-white')) {
        $('.header').css("margin-bottom", heHeight)
    }

    /*----------------------------------------------------*/
    /*	Header Fixed on Top Transparent Bg
     /*----------------------------------------------------*/

    if ($('.navbar').hasClass('no-bg')) {
        $('.intro-section').addClass('wide-intro')
    }

    /*----------------------------------------------------*/
    /*	Mobile Menu Toggle
     /*----------------------------------------------------*/

    $('.navbar-nav li.nav-link').on('click', function () {
        $('#navigation-menu').css("height", "1px").removeClass("in").addClass("collapse");
        $('#navigation-menu').removeClass("open");
    });

    /*----------------------------------------------------*/
    /*	Countdown
     /*----------------------------------------------------*/

    $("#clock").countdown("2017/03/08 20:00:00", function (event) {
        $(this).html(event.strftime(''
            + '<div class="cbox-1 clearfix"><span class="cbox-1-digit">%D</span> <span class="cbox-1-txt">Days</span></div>'
            + '<div class="cbox-1 clearfix"><span class="cbox-1-digit">%H</span> <span class="cbox-1-txt">Hrs</span></div>'
            + '<div class="cbox-1 clearfix"><span class="cbox-1-digit">%M</span> <span class="cbox-1-txt">Min</span></div>'
            + '<div class="cbox-1 clearfix"><span class="cbox-1-digit">%S</span> <span class="cbox-1-txt">Sec</span></div>'
        ));
    });

    /*----------------------------------------------------*/
    /*	OnScroll Animation
     /*----------------------------------------------------*/

    $('.animated').appear(function () {

        var elem = $(this);
        var animation = elem.data('animation');

        if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');
            if (animationDelay) {
                setTimeout(function () {
                    elem.addClass(animation + " visible");
                }, animationDelay);

            } else {
                elem.addClass(animation + " visible");
            }
        }

    });

    /*----------------------------------------------------*/
    /*	Intro Slider
     /*----------------------------------------------------*/

    $('.intro_slider').flexslider({
        animation: "fade",
        controlNav: false,
        directionNav: false,
        slideshowSpeed: 4000,
        animationSpeed: 700,
        start: function (slider) {
            $('body').removeClass('loading');
        }
    });

    /*----------------------------------------------------*/
    /*	Animated Scroll To Anchor
     /*----------------------------------------------------*/

    $('.header a[href^="#"], .page a.btn[href^="#"]').on('click', function (e) {
        
        e.preventDefault();

        var target = this.hash,
            $target = jQuery(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 30 // - 200px (nav-height)
        }, 'slow', 'easeInSine', function () {
            window.location.hash = '1' + target;
        });

    });

    if(window.innerWidth >=1024){
        var controller = new ScrollMagic.Controller();
        var scene = new ScrollMagic.Scene({
            triggerElement: '#trigger-block',
            duration: getDocHeight(),
            triggerHook: 0,
            pushFollowers: 0,})
            .setPin('#pined-form')
            .addTo(controller);
    }
    var windowPrevWidth = window.innerWidth;
    $(window).on('resize', function() {
        if(windowPrevWidth > window.innerWidth && window.innerWidth >= 1024){
            location.reload();
        }

    });


    function getDocHeight() {
        var docContent_1 = document.querySelector('.second-block');
        var docContent_2 = document.querySelector('.about');
        var contact = document.querySelector('.contact');

        return docContent_1.offsetHeight + docContent_2.offsetHeight - contact.offsetHeight;
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var form = document.querySelector('form');
    var submitButton = $('#submit');
    var formArray = form.querySelectorAll('.styled-input');
    [].forEach.call(formArray,function(item) {
        item.addEventListener('change', function() {
            if(!item.value) {
                item.classList.add('error');
            }else {
                if(item.getAttribute('type') === 'email'){
                    if(!validateEmail(item.value)){
                        item.classList.add('error');
                    }
                }
                item.classList.remove('error');
            }
        })
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var isValid = true;
        var itemsValues = {};
        [].forEach.call(formArray,function(item) {
            if(!item.value) {
                item.classList.add('error');
                isValid = false;
            }else {
                if(item.getAttribute('type') === 'email'){
                    if(!validateEmail(item.value)){
                        item.classList.add('error');
                        isValid = false;
                    }
                }
                item.classList.remove('error');
                itemsValues[item.getAttribute('name')] = item.value;
            }
        })

        if(isValid) {
            var settings = {
                'async': true,
                'url': '/l/api/register',
                'method': 'POST'
            };
            settings['data'] = itemsValues;


            $.ajax(settings)
                .done(function() {
                    $(form).hide();
                    submitButton.addClass('ga-webinar-success');
                    $('.contact__complete').show();
                    dataLayer.push(
                        {'event': 'WebinarWebFormSubmit'}
                    );
                })
                .error(function (err) {
                    submitButton.addClass('ga-webinar-error');
                });
        }
    });



    /*----------------------------------------------------*/
    /*	ScrollUp
     /*----------------------------------------------------*/

    $.scrollUp = function (options) {

        // Defaults
        var defaults = {
            scrollName: 'scrollUp', // Element ID
            topDistance: 600, // Distance from top before showing element (px)
            topSpeed: 800, // Speed back to top (ms)
            animation: 'fade', // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: '', // Text for element
            scrollImg: false, // Set true to use image
            activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        };

        var o = $.extend({}, defaults, options),
            scrollId = '#' + o.scrollName;

        // Create element
        $('<a/>', {
            id: o.scrollName,
            href: '#top',
            title: o.scrollText
        }).appendTo('body');

        // If not using an image display text
        if (!o.scrollImg) {
            $(scrollId).text(o.scrollText);
        }

        // Minium CSS to make the magic happen
        $(scrollId).css({'display': 'none', 'position': 'fixed', 'z-index': '2147483647'});

        // Active point overlay
        if (o.activeOverlay) {
            $("body").append("<div id='" + o.scrollName + "-active'></div>");
            $(scrollId + "-active").css({
                'position': 'absolute',
                'top': o.topDistance + 'px',
                'width': '100%',
                'border-top': '1px dotted ' + o.activeOverlay,
                'z-index': '2147483647'
            });
        }

        // Scroll function
        $(window).scroll(function () {
            switch (o.animation) {
                case "fade":
                    $(($(window).scrollTop() > o.topDistance) ? $(scrollId).fadeIn(o.animationInSpeed) : $(scrollId).fadeOut(o.animationOutSpeed));
                    break;
                case "slide":
                    $(($(window).scrollTop() > o.topDistance) ? $(scrollId).slideDown(o.animationInSpeed) : $(scrollId).slideUp(o.animationOutSpeed));
                    break;
                default:
                    $(($(window).scrollTop() > o.topDistance) ? $(scrollId).show(0) : $(scrollId).hide(0));
            }
        });

        // To the top
        $(scrollId).click(function (event) {
            $('html, body').animate({scrollTop: 0}, o.topSpeed);
            event.preventDefault();
        });

    };

});

(function () {
    var countDownDate = new Date("Dec 14, 2017 11:00:00").getTime();

// Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date();

        now.setTime(now.getTime() + now.getTimezoneOffset()*60*1000 - 5*3600*1000)

        // Find the distance between now an the count down date
        var distance = countDownDate - now.getTime();

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("countdown").innerHTML = '<div class="timer-block">'+days+'<span>days</span></div>'+
                                                          '<div class="timer-block">'+hours+'<span>hours</span></div>'+
                                                          '<div class="timer-block">'+minutes+'<span>minutes</span></div>'+
                                                          '<div class="timer-block">'+seconds+'<span>seconds</span></div>';

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
        }
    }, 1000);
})();