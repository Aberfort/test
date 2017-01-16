$(window).ready(function() {  

	"use strict";
	
	$(".skills").each(function() {		
		$(this).appear(function() { 
		

			$('.design-progress').goalProgress({
				goalAmount: 100,
				currentAmount: 95
			});
			
			$('.develop-progress').goalProgress({
				goalAmount: 100,
				currentAmount: 89
			});
			
			$('.photoshop-progress').goalProgress({
				goalAmount: 100,
				currentAmount: 87
			});
					
			$('.marketing-progress').goalProgress({
				goalAmount: 100,
				currentAmount: 92
			});
						
			
		});
	});
	
});