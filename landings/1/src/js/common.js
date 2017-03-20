$(document).ready(function(){
	//SVG Fallback
	$(".features__slogan h2").animated("fadeInLeft", "fadeOutRight");
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};
	function tablets(){
		if($(window).width()>736){
			if($(window).width()>$(window).height()){
				$('html.touch .promo__item').css("height",$(window).height()*0.85);
				$('html.touch .promo__tabs').css("height",$(window).height()*0.15);
				$('html.touch .promo__tabs .tab').css("height",$(window).height()*0.15);
				$('html.touch .promo__device').css("height",$(window).height()*0.74);
				$('html.touch .promo__device').css("margin-top",$(window).height()*0.15);
				$('html.touch .promo__text').css("padding-top",$(window).height()*0.28);
			};	
		};
	};
	tablets();
	$(window).on('orientationchange', function(event){
		tablets();
	});

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	$(".contact__wrap input").focus(function(){
		let link = $(this).parent();
		$(link).find("label").css({"top":"-14px","font-size":"12px","color":"#aeaeae"});
	});

	$(".contact__wrap textarea").focus(function(){
		let link = $(this).parent();
		$(link).find("label").css({"top":"-24px","font-size":"12px","color":"#aeaeae"});
	});
	$(".owl-carousel").owlCarousel({
		items:1,
		autoplay:true,
		autoplayTimeout:5000,
		URLhashListener:true,
		startPosition: 'first',
		animateIn:'fadeIn',
		animateOut:'fadeOut',
		mouseDrag:false,
		smartSpeed:300,
		dots:true,
	});
	$(".promo .owl-carousel").on("translate.owl.carousel", function(event){
		var atribute = $(".owl-item.owl-animated-in .promo__item").attr("data-hash");
		$(".promo__tabs .tab").removeClass("tab--active");
		var x = document.getElementsByClassName(atribute);
		$(x).addClass("tab--active");
	});
	$(".promo .owl-carousel").on("translated.owl.carousel", function(event){
		var atribute = $(".owl-item.active .promo__item").attr("data-hash");
		$(".promo__tabs .tab").removeClass("tab--active");
		var x = document.getElementsByClassName(atribute);
		$(x).addClass("tab--active");
	});

	$(".story__carousel").owlCarousel({
		items:1,
		autoplay:false,
		autoplayTimeout:5000,
		URLhashListener:true,
		startPosition: 'business',
		smartSpeed:300,
			// animateIn:'slideInRight',
			// animateOut:'slideOutLeft',
			dots:false,

		});
	$(".story .owl-carousel").on("translate.owl.carousel", function(event){
		var atribute_s = $(".owl-item.owl-animated-in .story__contents").attr("data-hash");
		$(".story__tabs .tab").removeClass("tab--active");
		var x = document.getElementsByClassName(atribute_s);
		$(x).addClass("tab--active");
	});
	$(".story .owl-carousel").on("translated.owl.carousel", function(event){
		var atribute_s = $(".owl-item.active .story__contents").attr("data-hash");
		$(".story__tabs .tab").removeClass("tab--active");
		var x = document.getElementsByClassName(atribute_s);
		$(x).addClass("tab--active");
	});

	$(".story__tabs .tab a").click(function(){
		$(".story__tabs .tab").removeClass("tab--active");
		$(this).parent().addClass("tab--active");
	});
	$("a.scrollto").click(function(){
		$('html, body').animate({
			scrollTop: $(".contact").offset().top
		}, 500);
	});
	function mobile(){
		if($(window).width()>1024 & $(window).height()>750){
			$(function() {
				$.scrollify({
					section : "section",
					easing: "easeOutExpo",
					scrollSpeed: 500,
				});
				$.scrollify.enable();
			});	
			$("#cd-vertical-nav").show();	
		} else{
			$(function(){
				$.scrollify.disable();
			});
			$("#cd-vertical-nav").hide();
		};
	};
	mobile();
	$(window).resize(function() {
		mobile();
	});
	$(".contact__links a").click(function(){
		var link = $(this).attr("href");
		$('html, body').animate({
			scrollTop: $(link).offset().top
		}, 500);
	});
});
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
	dataLayer.push({'cid' : getGAClientId(), 'event': 'CidReady'});
});


