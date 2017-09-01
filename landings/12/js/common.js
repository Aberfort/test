var offset = $('#contact').offset().top + 300;
$(document).ready(function(){
	//SVG Fallback
	$(".contact__wrap input").focus(function(){
		var link = $(this).parent();
		$(link).find("label").css({"top":"-14px","font-size":"12px","color":"#aeaeae"});
	});

	$(".contact__wrap textarea").focus(function(){
		var link = $(this).parent();
		$(link).find("label").css({"top":"-24px","font-size":"12px","color":"#aeaeae"});
	});

	$(window).resize(function() {
		//mobile();
	});
	$(".contact__links a").click(function(e){
		e.preventDefault();
		var link = $(this).attr("href");
		$('html, body').animate({
			scrollTop: $(link).offset().top
		}, 500);
	});

	$(window).on('scroll', function(e){
		if($(window).scrollTop() > 100){
			$('#header').addClass('fixed-header--scrolled');
		}else{
			$('#header').removeClass('fixed-header--scrolled');
		}
		if($(window).scrollTop() > 400){
			for (var i = 0; i < 4; i++){
				document.querySelectorAll(".about__ring")[i].classList.add("about__ring--active");
			}
		}
	})
	$('span.icons').remove();
	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
		$('body').css({
			'height': "100%"
		})
		$('body').on('scroll', function(e){
			if($('body').scrollTop() > 100){
				$('#header').addClass('fixed-header--scrolled');
			}else{
				$('#header').removeClass('fixed-header--scrolled');
			}
		})
  	 }
});
$("#cemetery").owlCarousel({
	autoplay: true,
	items: 5,
	responsive: {
		1199: {
			items: 5
		},
		1024: {
			items: 4
		},
		768: {
			items: 3
		},
		320: {
			items: 1
		}
	},
	onInitialized: function (event) {
	$("#cemetery").parent().css({opacity: 1})
}


});
$("a.scrollto").click(function(e){
	e.preventDefault();
	scrollToID('#contact');
	return false;
});

function scrollToID(theSelector) {
	$('html,body').animate({scrollTop: offset}, 500);
}


