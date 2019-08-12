$(document).ready( function() {

  $('.grid').masonry({
    itemSelector: '.grid-item'
  });
  $('.grid2').masonry({
    itemSelector: '.grid-item',
	percentPosition: true,
    columnWidth: 70,
    gutter: 30
  });
  
});
