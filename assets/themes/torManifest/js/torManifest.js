$(function () {

	// SHOWING FIRST POST TITLE WHEN HOVERING OVER A CATEGORY
	var siteDescription = $('#siteDescription').html();
	$('#mainNav a').hover(function() {
		console.log('hovering');
		var description = $(this).attr('title');
		$('#siteDescription').html(description);   
		}, function() {
		$('#siteDescription').html(siteDescription); 
	});

	// SHOWING THE COVERPICTURE PREVIEW BELONING TO A POST
	var siteDescription = $('#siteDescription').html();
	$('#mainNav a').hover(function() {
		console.log('hovering');
		var description = $(this).attr('title');
		$('#siteDescription').html(description);   
		}, function() {
		$('#siteDescription').html(siteDescription); 
	});

});	