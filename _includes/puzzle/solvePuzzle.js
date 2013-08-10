		

var Puzzle = function (s) {
	"use strict";
	this.size = s;
	this.spacePos = [2];
	this.spacePos[0] = 0;
	this.spacePos[1] = 0;
	this.box = [(this.size)];
	this.cost = 0;
	this.estCost = 0;
	this.parent = null;
	var i, j;
	for(i=0; i<this.size; i++){
		this.box[i] = [(this.size)];
		for (j=0; j<this.size; j++) {
			this.box[i][j]=i*this.size+j;
		}
	}
};

Puzzle.prototype.animSwap = function(a, b){
	"use strict";
};
// just counts how many pieces that are in the wrong place
Puzzle.prototype.heuristicMisplaced = function() {
	"use strict";
	var misplacedBlocks = 0;
	for(var i=0; i<this.size; i++){
		for (var j=0; j<this.size; j++) {
			if (this.box[i][j] != i*this.size+j) misplacedBlocks += 1;
		}
	}
	return misplacedBlocks;
}

Puzzle.prototype.RandomPuzzle = function() {
	"use strict";
	do {
		var tempArray = this.getOneDimensional();
		// Fisher Yates shuffle algorithm from http://sedition.com/perl/javascript-fy.html
		var i = tempArray.length;
		while ( --i ) {
			var j = Math.floor( Math.random() * ( i + 1 ) );
			var tempi = tempArray[i];
			var tempj = tempArray[j];
			tempArray[i] = tempj;
			tempArray[j] = tempi;
		}
		
		// go back to the two dimensional array
		for(var i=0; i<this.size; i++){
			for (j=0; j<this.size; j++) {
				if (tempArray[i*this.size+j] == 0) {
					this.spacePos[0] = i;
					this.spacePos[1] = j; 
				}	
				this.box[i][j] = tempArray[i*this.size+j];
			}
		}
		// this.print();
	}
	while (!this.isSolveable());
	return this;
}
	
Puzzle.prototype.getOneDimensional =  function() {
	"use strict";
	var oneDimensional = [];
	// turns 2 dimensional array into 1 dimensional
	for(var i=0; i<this.size; i++){
		for (var j=0; j<this.size; j++) {
			oneDimensional[i*this.size+j] = this.box[i][j];
		}
	}
	return oneDimensional;
}

// get the resulting puzzle after having done one desired move given by a
Puzzle.prototype.nextPuzzle =  function(a) {
	"use strict";
	var swapPos = new Array(2);
	var nextPz = this.copy();
	var swapped;
	// 1: swap upward
	if (a == 0 && this.spacePos[0] != 0) {
		swapPos[0] = this.spacePos[0]-1;
		swapPos[1] = this.spacePos[1];
		swapped = nextPz.swap(this.spacePos, swapPos);
	}
	// 2: swap right
	else if (a == 1 && this.spacePos[1] != (this.size-1) ) {
		swapPos[0] = this.spacePos[0];
		swapPos[1] = this.spacePos[1]+1;
		swapped = nextPz.swap(this.spacePos, swapPos);
	}
	// 3: swap downward
	else if (a == 2 && this.spacePos[0] != (this.size-1)){
		swapPos[0] = this.spacePos[0]+1;
		swapPos[1] = this.spacePos[1];
		swapped = nextPz.swap(this.spacePos, swapPos);
	}
	// 1: swap left
	else if (a == 3 && this.spacePos[1] != 0){
		swapPos[0] = this.spacePos[0];
		swapPos[1] = this.spacePos[1]-1;
		swapped = nextPz.swap(this.spacePos, swapPos);
	}
	return nextPz;
}

Puzzle.prototype.swap = function swap(sp, b) {
	var temp = this.box[sp[0]][sp[1]];
	this.box[sp[0]][sp[1]] = this.box[b[0]][b[1]];
	this.box[b[0]][b[1]] = temp;
	this.spacePos[0] = b[0];
	this.spacePos[1] = b[1];
	return true;
}

Puzzle.prototype.copy = function() {
	var c = new Puzzle(this.size);
	for(var i=0; i<this.size; i++){
		for (var j=0; j<this.size; j++) {
			c.box[i][j]=this.box[i][j];
		}
	}
	return c;
}
Puzzle.prototype.print = function() {
	var output = "<div class='testPrint'>";
	for(var i=0; i<this.size; i++){
		for (var j=0; j<this.size; j++) {
			output += this.box[i][j] + " ";
		}
		output += "</br>";
	}
	output += "</br>";
	output += "<p style='color:red'>" + this.spacePos[0] + "</p>" + "<p style='color:blue'>" + this.spacePos[1] + "</p>";
	output += "</div>";
	return output;
}

Puzzle.prototype.isSolveable = function() {
	var inversions = 0;
	var permutation = this.getOneDimensional();
	
	// counts number of inversions
	for(var i=0; i<this.size*this.size; i++){ 
		for (var j=i; j<this.size*this.size; j++) {
			if (permutation[j] < permutation[i] && permutation[j] != 0) {
				inversions += 1;
			}
		}
	}
	// magic formula for solvability from 
	// http://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
	if ((this.size%2 != 0 && inversions%2 == 0)
	|| ((this.size%2 == 0) && (((this.size - this.spacePos[1]+1)%2 != 0) && (inversions%2 == 0)))
	|| ((this.size%2 == 0) && (((this.size - this.spacePos[1]+1)%2 == 0) && (inversions%2 != 0)))) {	
		return true;
	}
	return false;
}
		

Puzzle.prototype.equals = function(p) {
	for(var i=0; i<this.size; i++){
		for (var j=0; j<this.size; j++) {
			if (this.box[i][j] != p.box[i][j])
				return false;
		}
	}
	return true;
}

// compare considering estimated cost to goal
function comparePuzzles(a, b) {
	return a.estCost - b.estCost;
}

// convert a string to a Puzzle
function toPuzzle(s) { 
	var rows = Math.floor(Math.sqrt(s.length));
	var puzzle = new Puzzle(rows);
	for(var i=0; i<rows; i++){
		for (var j=0; j<rows; j++) {
			puzzle.box[i][j] = parseInt(s.charAt(i*rows+j));
			if (puzzle.box[i][j] == 0) {
				puzzle.spacePos[0] = i;
				puzzle.spacePos[1] = j;
			}
		}
	}
	return puzzle;
}
onmessage = function (event) {

		var initialPuzzle = toPuzzle(event.data);
		var rows = initialPuzzle.size;
		//postMessage(initialPuzzle.print()  + event.data.length);
		
		var open = new Array();
		var closed = new Array();
		
		open.push(initialPuzzle);
		
		var neighbor = new Puzzle(rows);
		var current = new Puzzle(rows);
		// var neighbor = new Puzzle(rows);
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
		postMessage(solution);
		
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
		
		
	
};