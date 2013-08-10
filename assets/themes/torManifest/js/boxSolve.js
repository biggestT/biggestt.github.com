$(document).ready(function() {
	
	// SHOWING CATEGORY DESCRIPTIONS
	var siteDescription = $('#siteDescription').html();

	$('#mainNav a').hover(function() {
		var description = $(this).attr('title');
		$('#siteDescription').html(description);   
		}, function() {
		$('#siteDescription').html(siteDescription); 
	});
	
	
	// CONSTANTS
	const rows = 4, size = 33, roundness = 30, speed = 400;
	
	var isHome = false;
	if ($('body').attr('class') == 'home page page-id-58 page-template-default') {
		isHome = true; 
	}
	// GET THE PUZZLE TO SOLVE
	var initialPuzzle = new Puzzle(rows);
	if (isHome) {
		initialPuzzle.RandomPuzzle();
	}
	
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

// });
	

// $(document).ready(function() {
	// SOLVE THE PUZZLE
	
	
	function findSolution() {
		var open = new Array();
		var closed = new Array();
		
		open.push(initialPuzzle);
		
		var neighbor = new Puzzle(rows);
		var startExpanding = 0; // depth first search
		
		while (!(open.length == 0)) {
			// Option to choose where to start expanding (breadth or depth first)
			startExpanding = 0;
			// adds current node to closed
			current = open[startExpanding];
			// checks if current node is goal
			if (current.heuristicMisplaced() == 0) {
				closed.push(current);
				open.pop();
				break;
			}
			// move current from open to closed
			open.shift();
			closed.push(current);

			// creates the next nodes
			for (var i=0; i<4; i++) {
				neighbor = current.nextPuzzle(i);
				if (!(contains(closed, neighbor))) {
					var tentativeCost = closed[closed.length-1].cost + 1;
					// check if next already in open or closed
					if (!(contains(open, neighbor)) || (tentativeCost < neighbor.cost)) {
						open.push(neighbor);
						neighbor.parent = current;
						neighbor.cost = tentativeCost;
						neighbor.estCost = neighbor.cost + neighbor.heuristicMisplaced();
					}
				}
			}
			open.sort(comparePuzzles);
		}
		// Tracks the path to the solution
		var solution = new Array();
		while (!current.equals(initialPuzzle)) {
				solution.push(current);
				current = current.parent;
		}

		// UTILITY METHODS
		
		// Checks if an array contains a certain puzzle
		function contains (a, obj) {
			for (var i=0; i< a.length; i++) {
				if (a[i].equals(obj)) {
					return true;
				}
			} 
			return false;
		}	
		// // An Mergesort to perform faster sort on the huge puzzle arrays
		// var sort = function(array) {
			// var len = array.length;
			// if(len < 2) { 
				// return array;
			// }
			// var pivot = Math.ceil(len/2);
			// return merge(sort(array.slice(0,pivot)), sort(array.slice(pivot)));
		// };

		var merge = function(left, right) {	
			var result = [];
			while((left.length > 0) && (right.length > 0)) {
				if(left[0]["obj"].someProp > right[0]["obj"].someProp) {
				  result.push(left.shift());
				}
				else {
					result.push(right.shift());
				}
			}
			result = result.concat(left, right);
			return result;
		};

		
		// ANIMATE THE SOLUTION
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
	}
	
	// if (isHome) {
	// setTimeout(findSolution(), 6000);
	// }

	$('#tile'+(rows*rows-1)).load(findSolution())
});


	