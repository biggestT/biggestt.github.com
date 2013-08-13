$(function() {	
	
	// get src of this file as it executes
	var scripts = document.getElementsByTagName("script"),
	solveSrc = scripts[scripts.length-1].src.replace('startup.js', 'solvePuzzle.js');

	// CONSTANTS
	rows = 3;
	size = 22;
	speed = 400;

	roundness = 30;
	
	
	// var isHome = false;
	// if ($('body').attr('class') == 'home page page-id-58 page-template-default') {
		// isHome = true; 
	// }
	// GET THE PUZZLE TO SOLVE
	initialPuzzle = new Puzzle(rows);
	// if (isHome) {
		initialPuzzle.RandomPuzzle();
	// }
	
	// PRINT THE INITIAL PUZZLE
	var boxHtml="";
	for (i = 0; i < rows; i += 1) {
		for (j = 0; j < rows; j += 1) {
			var number = initialPuzzle.box[i][j];
			if (number != 0) {
				boxHtml += "<div class='tile' id='tile" + number + "' ></div>";
			}
		}
	}
	
	$('#puzzle').html(boxHtml);
	var cssTile = {
		'display-style' : 'block',
		width : size + 'px',
		height : size + 'px'
    }
	$('.tile').css(cssTile);
	for (i = 0; i < rows; i += 1) {
		for (j = 0; j < rows; j += 1) {
			var number = initialPuzzle.box[i][j];
			var tileColor = 'rgb(' + (number*15+40) + ',' + (number*10+120) + ',255)';
			$('#tile'+number).css( 'background-color', tileColor);
			$('#tile'+number).css({
				'background-color': tileColor,
				position: 'absolute',
				top: i*size + 'px',
				left: j*size + 'px'
			}).show();
		}	
	}
	// Create round edges
	$('#tile'+(rows-1)).css('border-top-right-radius', (roundness + 'px'));
	$('#tile'+(rows*rows-rows)).css('border-bottom-left-radius', (roundness + 'px'));
	$('#tile'+(rows*rows-1)).css('border-bottom-right-radius', (roundness + 'px'));
	
	var puzzleString = initialPuzzle.puzzleToString();
	// Give an independent webworker the task to solve the puzzle
	var puzzleSolver = new Worker(solveSrc);
	puzzleSolver.postMessage(puzzleString);
	
	// // Wait until the worker has found the solution
	puzzleSolver.onmessage = function (event) {
		
		// ANIMATE THE SOLUTION
		var solution = event.data;
		var current = initialPuzzle;
		var output =  'solution steps: ' + solution.length + '</br>';
		
		function goNext() {
			
			if (!solution.length) {
				return; }
			var next = solution.pop();
			// ANIMATE TILE  
			var spA = current.spacePos;		
			var spB = next.spacePos;
			var movingTile = current.box[spB[0]][spB[1]];
			var leftOffset = size*(spA[1]-spB[1]);
			var topOffset = size*(spA[0]-spB[0]);
			var thisTile = $('#tile'+movingTile);
			current = next;
			thisTile.animate({
				opacity: 1.0,
				top: "+=" + topOffset,
				left: "+=" + leftOffset
				}, speed, goNext);
		};
		goNext();
		
		output += 'open length: ' + open.length;
		$('#message').html(output);
	};
});