
	// Carousel
	
jQuery(window).load(function() {
	jQuery('#allinone_carousel_charming').allinone_carousel({
		skin: 'charming',
		width: 1170,
		height: 670,
		responsive:true,
		autoPlay: 3,
		resizeImages:true,
		autoHideBottomNav:false,
		showElementTitle:false,
		verticalAdjustment:50,
		showPreviewThumbs:false,
		easing:'easeInSine',
		animationTime: .5,
		numberOfVisibleItems:5,
		elementsHorizontalSpacing:200,
		nextPrevMarginTop:23,
		playMovieMarginTop:0,
		bottomNavMarginBottom:-10	
	});	
});