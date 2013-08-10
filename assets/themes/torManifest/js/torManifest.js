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
	var background = $('#background');

	$('.prevImg').each( function (i) {
		var previewImage = new Image();
		previewImage.src = $(this).attr('src');
		previewImage.onload = function () {
			this.css({
				'background': 'url(' + previewImage.src + ')' + ' center center no-repeat',
				'background-size': 'cover'
			});
		}.bind(background);
	});
	

});	