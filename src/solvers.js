/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/
var Tree = function(board) {
  var newTree = {};
  newTree.board = board;
  newTree.children = [];
  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(board) {
  this.children.push(Tree(board));
};

treeMethods.contains = function(target, boo) {
  var boo = boo || false;

  if (this.value === target) {
    return true;
  }

  if(this.children.length > 0){
    for (var i = 0 ; i < this.children.length ; i++) {
      boo = this.children[i].contains(target, boo);
    }
  }

  return boo;
};

treeMethods.checkRooksConflicts = function() { //This function returns true if the board has ANY Rook conflict
  var currentBoard = this.board;
  if ( currentBoard.hasAnyRowConflicts() || currentBoard.hasAnyColConflicts()) {
    return true;
  }
  return false;

}

treeMethods.checkQueensConflicts = function() { //This function returns true if the board has ANY Queens conflict
  var currentBoard = this.board;
  if ( currentBoard.hasAnyRowConflicts() || currentBoard.hasAnyColConflicts() || currentBoard.hasAnyMajorDiagonalConflicts() || currentBoard.hasAnyMinorDiagonalConflicts()) {
    return true;
  }
  return false;

}

treeMethods.generateTree = function(n, board){

  var currentBoard = board || new Board({'n':n});
  var currentTree = new Tree(currentBoard);
  var tmp = [];

  var child = Object.create(Board.prototype)
  Board.prototype.constructor = Board;
  console.log(child)

  return 0;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var child = Object.create(Board.prototype)
      console.log
      child.togglePiece(i,j);
      tmp.push(child)
     
 
    }
  }

  
  return tmp;
}




window.findNRooksSolution = function(n) {
  console.log(this)
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
