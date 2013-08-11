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
	// var background = [];
	// background[0] = $('#backgroundLeft');
	// background[1] = $('#backgroundRight');

	// $('.prevImg').each( function (i) {
	// 	var previewImage = new Image();
	// 	previewImage.src = $(this).attr('src');
	// 	previewImage.onload = function () {
	// 		this.css({
	// 			'background': 'url(' + previewImage.src + ')' + ' center center no-repeat',
	// 			'position': 'absolute',
	// 			'background-size': 'cover'
	// 		});
	// 		this[1].css({
	// 			'background': 'url(' + previewImage.src + ')' + ' center center no-repeat',
	// 			'position': 'absolute',
	// 			'-webkit-transform': 'scaleX(-1)',
	// 			'background-size': 'cover'
	// 		});
	// 	};
	// });

	// SETTING THE NATIVE WIDTH OF EACH PREVIEW IMAGE
	$('img.prevImg').each( function (i) {
		var previewImage = new Image();
		previewImage.src = $(this).attr('src');
		console.log(this);

		previewImage.onload = function (e) {

			var matchWidth = this.parent().width();
			var matchHeight = this.parent().height();

			console.log(matchWidth + ' ' + matchHeight );
			// if (matchWidth < e.)
			var ratio = 1-(e.srcElement.width-matchWidth)/e.srcElement.width;
			var newHeight = e.srcElement.height*ratio;

			this.css({
				'width': matchWidth,
				'height': newHeight,
			});
		}.bind($(this));
	});
	

});	