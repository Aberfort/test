$(document).ready(function(){
	//SVG Fallback
	$(".contact__wrap input").focus(function(){
		let link = $(this).parent();
		$(link).find("label").css({"top":"-14px","font-size":"12px","color":"#aeaeae"});
	});

	$(".contact__wrap textarea").focus(function(){
		let link = $(this).parent();
		$(link).find("label").css({"top":"-24px","font-size":"12px","color":"#aeaeae"});
	});

	$("a.scrollto").click(function(){
		$('html, body').animate({
			scrollTop: $(".contact").offset().top
		}, 500);
	});

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


