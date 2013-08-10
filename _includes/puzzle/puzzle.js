

var Puzzle = function(s){
	this.size = s;
	this.spacePos = new Array(2);
	this.spacePos[0] = 0;
	this.spacePos[1] = 0;
	this.box = new Array(this.size);
	this.cost = 0;
	this.estCost = 0;
	this.parent = null;
	
	for(i=0; i<this.size; i++){
		this.box[i] = new Array(this.size)
		for (j=0; j<this.size; j++) {
			this.box[i][j]=i*this.size+j;
		}
	}
};

Puzzle.prototype.animSwap = function(a, b){
	
};
// just counts how many pieces that are in the wrong place
Puzzle.prototype.heuristicMisplaced = function() {
	var misplacedBlocks = 0;
	for(i=0; i<this.size; i++){
		for (j=0; j<this.size; j++) {
			if (this.box[i][j] != i*this.size+j) misplacedBlocks += 1;
		}
	}
	return misplacedBlocks;
}

Puzzle.prototype.RandomPuzzle = function() {
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
		for(i=0; i<this.size; i++){
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
	var oneDimensional = [];
	// turns 2 dimensional array into 1 dimensional
	for(var i=0; i<this.size; i++){
		for (var j=0; j<this.size; j++) {
			oneDimensional[i*this.size+j] = this.box[i][j];
		}
	}
	return oneDimensional;
}
		
// randomly performs a number of moves on the puzzle
// Puzzle.prototype.nextRandomPuzzle = function(a) {
	// var swapped, r, swapPos;
	// for(i=0; i<a; i++){
		// swapped = false;
		// while (swapped != true) {
			// r = Math.floor(Math.random()*3);
			// swapPos = new Array(2);
			// // 1: swap upward if not in the first row
			// if (r == 0 && this.spacePos[0] != 0) {
				// swapPos[0] = this.spacePos[0]-1;
				// swapPos[1] = this.spacePos[1];
				// swapped = this.swap(this.spacePos, swapPos);
			// }
			// // 2: swap right if not in the last column
			// else if (r == 1 && this.spacePos[1] != (this.size-1) ) {
				// swapPos[0] = this.spacePos[0];
				// swapPos[1] = this.spacePos[1]+1;
				// swapped = this.swap(this.spacePos, swapPos);
			// }
			// // 3: swap downward if not in the last row
			// else if (r == 2 && this.spacePos[0] != (this.size-1)){
				// swapPos[0] = this.spacePos[0]+1;
				// swapPos[1] = this.spacePos[1];
				// swapped = this.swap(this.spacePos, swapPos);
			// }
			// // 3: swap left if not in the first column
			// else if (r == 3 && this.spacePos[1] != 0){
				// swapPos[0] = this.spacePos[0];
				// swapPos[1] = this.spacePos[1]-1;
				// swapped = this.swap(this.spacePos, swapPos);
			// }
		// }
	// }
	// return this;
// }
// get the resulting puzzle after having done one desired move given by a
Puzzle.prototype.nextPuzzle =  function(a) {
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
	for(i=0; i<this.size; i++){
		for (j=0; j<this.size; j++) {
			c.box[i][j]=this.box[i][j];
		}
	}
	return c;
}
Puzzle.prototype.print = function() {
	var output = "<div class='testPrint'>";
	for(i=0; i<this.size; i++){
		for (j=0; j<this.size; j++) {
			output += this.box[i][j] + " ";
		}
		output += "</br>";
	}
	output += "</br>";
	output += "<p style='color:red'>" + this.spacePos[0] + "</p>" + "<p style='color:blue'>" + this.spacePos[1] + "</p>";
	output += "</div>";
	return output;
	// document.write("<p style='color:red'>" + this.estCost + "</p>");
	// document.write("<p style='color:blue'>" + this.cost + "</p>");
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
// Puzzle.prototype.getSwapPos = function(p) {
	// var pos = new Array(2);
	// for (i=0; i<this.size; i++) {
		// for (j=0; j<this.size; j++) {
			// if (p.box[i][j] != this.box[i][j] && i != this.spacePos[0] && j != this.spacePos[1]) {
				// pos[0] = i;
				// pos[1] = j;
				// return pos;
			// }
		// }
	// }
	
// }

Puzzle.prototype.puzzleToString = function() {
	var string = "";
	for(var i=0; i<this.size; i++){
		for (var j=0; j<this.size; j++) {
			string += this.box[i][j].toString();
		}
	}
	return string;
	
}