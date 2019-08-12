 "use strict";
/*-----------------------------------
 Quick Mobile Detection
 -----------------------------------*/

 var isMobile = {
    Android: function() {
     
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
    
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
     
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
     
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
     
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
     
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};



 /*-----------------------------------
 REVOLUTION Slider
 -----------------------------------*/
	$(document).ready(function() {
            
			
			/*-- shop detail page tabs --*/

			$('ul.tabs li').on('click', function(){
				var tab_id = $(this).attr('data-tab');

				$('ul.tabs li').removeClass('current');
				$('.tab-content').removeClass('current');

				$(this).addClass('current');
				$("#"+tab_id).addClass('current');
			});
		
			
  
			$('.scrollbar-inner').niceScroll({
				cursorcolor: "rgba(239,202,160,0.9)",
				cursoropacitymin: 0,
				cursoropacitymax: 0.7,
				cursorborder: "none",
				scrollspeed: 100,
				cursorborderradius: "6px",
				cursorwidth: "6px",
				mousescrollstep: 70,
				autohidemode: "leave",
				railpadding: { top: 0, right: 2, left: 0, bottom: 2 }
			});
			
    });



/*-----------------------------------
FUNFACTSs
-----------------------------------*/
	$('.count').waypoint(function() {  
		// start all the timers
		$('.count').each(count);
      
			function count(options) {
	  
			var $this = $(this);
			options = $.extend({}, options || {}, $this.data('countToOptions') || {});
			$this.countTo(options);
			}
		},
		{
			offset: '70%',  // middle of the page
			triggerOnce: true	
		});


/*-- Page preloader --*/
			
	$(window).load(function(){
		$('.preloader').delay(1000).fadeOut(1000);
	});

