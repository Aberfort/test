$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};
	//Img drag off
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

$(document).ready(function() {
	// Animations
	function animations(){
		if($(window).width() > 767) {
			$(".promo__tag").animated("fadeInUp");
			$(".expertise__item").animated("fadeInUp");
			$(".animation-left").animated("fadeInLeft");
			$(".animation-down").animated("fadeInUp");
			$(".animation-right").animated("fadeInRight");
		}
	}

	// Full height block
	function heightDetect() {
		$(".popup").css("height", "100vh");
	};
	heightDetect();
	animations();
	scrollMenu();
	$(window).resize(function() {
		heightDetect();
		scrollMenu();
		animations();
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
		if($('.js__menu').hasClass('active--reg')){
			$(".popup").fadeOut(600);
			$(".promo__stick").fadeIn(600);
			$(".promo .fixed").fadeOut(0);
			$(".promo__menu").removeClass("active");
			$(".promo__logo").removeClass("active");
			enable_scroll();
			$("html").css('height', 'auto').css('overflow-y', 'scroll');
		}else if ($(".popup").is(":visible")) {
			$(".popup").fadeOut(600);
			$(".promo__menu").removeClass("active");
			$(".promo__logo").removeClass("active");
			enable_scroll();
			$("html").css('height', 'auto').css('overflow-y', 'scroll');
		} else{
			$('.popup__navigation').css('display', 'block');
			$('.popup__registration').css('display', 'none');
			$('.popup__speaker').css('display', 'none');
			$(".popup").fadeIn(600);
			$(".promo__menu").addClass("active");
			$(".promo__logo").addClass("active");
			disable_scroll();
			$("html").css('height', '100%').css('overflow-y', 'hidden');
		}
	});



	// Popup menu
	$(".registration").click(function(){
		$('.popup__navigation').css('display', 'none');
		$('.popup__registration').css('display', 'block');
		$('.popup__speaker').css('display', 'none');
		$(".popup").fadeIn(600);
		$(".promo__stick").fadeOut(600);
		$(".promo .fixed").fadeIn(600);
		$(".js__menu").addClass("active--reg");
		$(".promo__menu").addClass("active");
		$(".promo__logo").addClass("active");
		disable_scroll();
		$("html").css('height', '100%').css('overflow-y', 'hidden');
	});

	// Popup menu
	$(".speaker_1").click(function(){
		$('.popup__navigation').css('display', 'none');
		$('.popup__registration').css('display', 'none');
		$('.popup__speaker').css('display', 'block');
		$(".popup").fadeIn(600);
		$(".promo__stick").fadeOut(600);
		$(".promo .fixed").fadeIn(600);
		$(".js__menu").addClass("active--reg");
		$(".promo__menu").addClass("active");
		$(".promo__logo").addClass("active");
		disable_scroll();
		$("html").css('height', '100%').css('overflow-y', 'hidden');
	});

	//Mobile app carousel
	$(".app__carousel").owlCarousel({
		items:1,
		autoplay:false,
		autoplayTimeout:5000,
		URLhashListener:true,
		startPosition: 'first',
		// animateIn:'fadeIn',
		// animateOut:'fadeOut',
		mouseDrag:false,
		smartSpeed:300,
		dots:true,
	});

	//Active tab
	$(".app .app__carousel").on("translate.owl.carousel", function(event){
		var atribute = $(".owl-item.owl-animated-in .app__content").attr("data-hash");
		$(".app__tabs .app__tab").removeClass("app__tab--active");
		var x = document.getElementsByClassName(atribute);
		$(x).addClass("app__tab--active");
	});
	$(".app .app__carousel").on("translated.owl.carousel", function(event){
		var atribute = $(".owl-item.active .app__content").attr("data-hash");
		$(".app__tabs .app__tab").removeClass("app__tab--active");
		var x = document.getElementsByClassName(atribute);
		$(x).addClass("app__tab--active");
	});

	//Call to scroll
	$("a.scrollto").click(function(){
		$('html, body').animate({
			scrollTop: $(".contact").offset().top
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
			scrollTop: $(linked).offset().top
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
			scrollTop: $(linked).offset().top - 80
		}, 500);
	});

	//Scroll menu
	function scrollMenu() {
		window.onscroll=function(){
			if(window.innerWidth > 1259){
				if($(window).scrollTop() > 130){
					document.querySelector(".promo__stick").classList.add("promo__stick--js");

				} else{
					document.querySelector(".promo__stick").classList.remove("promo__stick--js");
				};
			} else {
				document.querySelector(".promo__stick").classList.remove("promo__stick--js");
			}
		}
	}

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
//@prepros-append contact.js
//@prepros-append assets/owl.carousel.js

function getGAClientId() {
	try {
		var tracker = ga.getAll()[0];
		return tracker.get('clientId');
	} catch(e) {
		console.log("Error fetching clientId");
		return '';
	}
};
$(window).load(function(){
	getGAClientId();
	dataLayer.push({'cid' : getGAClientId(), 'event': 'сidReady'});
});