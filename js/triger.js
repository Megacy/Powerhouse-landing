$(document).ready(function() {	
		"use strict";
		$(function(){startOWLtestimonial1();})
		function startOWLtestimonial1() {
		$("#testimonial").owlCarousel({
		autoplay:true, //Set AutoPlay to 3 seconds
		autoplaySpeed : 2000,
      items : 1,
	navigation : true
  });
		}
  $(".related-slider").owlCarousel({
	stagePadding: 0,
	margin:30,
	navigation : false,
	pagination : false,
	autoplay:true, //Set AutoPlay to 3 seconds
	autoplaySpeed : 2000,
	stopOnHover : true,
	responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        700:{
            items:2,
        },
        1050:{
            items:2,
			
        },
		1051:{
            items:2,
			
        }
    }

  });
  $(".related-gallery-slider").owlCarousel({
	stagePadding: 0,
	margin:30,
	navigation : false,
	pagination : false,
	autoplay:true, //Set AutoPlay to 3 seconds
	autoplaySpeed : 2000,
	stopOnHover : true,
	responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        700:{
            items:2,
        },
        1050:{
            items:2,
			
        },
		1051:{
            items:3,
			
        }
    }

  });
 }); 