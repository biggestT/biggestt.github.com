$(function () {

	// Add capton text to images
	$('.content img').each( function () {
		var captionText = $(this).attr('alt');
		var caption = $('<p>');
		caption.attr('class', 'caption');
		caption.text(captionText);
		$(this).parent().append(caption);
	})
	// SHOWING FIRST POST TITLE WHEN HOVERING OVER A CATEGORY
	var siteDescription = $('#siteDescription').html();
	$('#mainNav a, a.icon').hover(function() {
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
	

	// GLOCAL VARIABLES
	// ---------------

	var previewImages = [];

	var constrainingDivId = '.container-narrow';
	var matchWidth = $(constrainingDivId).width();
	var matchHeight = $(constrainingDivId).height();

	// GATHER ALL OF THE PREVIEW IMAGES
	// ----------------------------------

	var initalizePreviewImages = function () {
		$('img.prevImg').each( function (i) {
			previewImages[i] = new Image();
			previewImages[i].src = $(this).attr('src');
			previewImages[i].owner = $(this);
			previewImages[i].onload = firstTimeCrop;
		});
	}

	
	// CROPPING OF THE PREVIEW IMAGES
	// ----------------------------------
	
	var cropImage = function (img) {
		var w = img.width;
		var ratio = 1 - (img.width - matchWidth)/img.width;
		var newHeight = img.height * ratio;

		img.owner.css({
			'width': matchWidth,
			'height': newHeight,
		});
		console.log(img);
	}

	var firstTimeCrop = function (e) {
		cropImage(e.srcElement);
	}
	
	var reCropAllPreviewImages = function () {
		// update proportions to match
		matchWidth = $(constrainingDivId).width();
		matchHeight = $(constrainingDivId).height();

		for (i in previewImages) {
			cropImage(previewImages[i]);
		}
	}

	// redo croppin if window size changes
	// -------------------------------
	window.onresize = reCropAllPreviewImages;


	// Start doing the initial cropping!
	// --------------------------
	initalizePreviewImages();





	

});	