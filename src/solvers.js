/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

window.findSolution = function(n, row, validator, callback){

  if(n === row) {
    callback();
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(row,i)

    if (!board[validator]){
     findSolution(n,++row,validator,callback);
   }

    board.togglePiece(row,i)
  }
}

  // var currentBoard = board || new Board({'n':n});
  // var currentTree = new Tree(currentBoard);
  // var tmp = [];

  // var child = Object.create(Board.prototype)

  // Board.prototype.constructor = Board;
  // console.log(child)

  // return 0;

  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     var child = Object.create(Board.prototype)
  //     console.log
  //     child.togglePiece(i,j);
  //     tmp.push(child)
     
 
  //   }
  // }

  

// }




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

