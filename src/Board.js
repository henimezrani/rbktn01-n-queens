// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var bitStr = this.rows()[rowIndex].join('');
      return check(bitStr); // fixme
    },



    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i = 0 ; i < this.rows().length ; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var bitStr = '';
      for (var i = 0 ; i < this.rows().length ; i++ ) {
        bitStr += this.rows()[i][colIndex]
      }
      return check(bitStr);
     
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0 ; i < this.rows().length ; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        var i = 0;
        var j = majorDiagonalColumnIndexAtFirstRow;
      } else{
        var j = 0;
        var i = -majorDiagonalColumnIndexAtFirstRow;
      }
      var bitStr = '';
      while(i < this.rows().length && j < this.rows().length){
        bitStr+=this.rows()[i][j];
        i++;
        j++;
      }
      if (check(bitStr)) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      for (var k = 0 ; k < this.rows().length-1 ; k ++) {
        if (k === 0) {
          if (this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(0,0))) {
            return true;
          }
        }
        if (this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(0,k))) {
          return true;
        }
        if (this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(k,0))) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      if (minorDiagonalColumnIndexAtFirstRow >= this.rows().length - 1) {
        var i = this.rows().length - 1;
        var j = minorDiagonalColumnIndexAtFirstRow - (this.rows().length - 1); //
      } else{
        var j = 0;
        var i = minorDiagonalColumnIndexAtFirstRow;
      }
      var bitStr = '';
      while(i >= 0 && j < this.rows().length){
        bitStr+=this.rows()[i][j];
        i--;
        j++;
      }
      if (check(bitStr)) {
        return true;
      }
      return false;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var k = 0 ; k < this.rows().length-1 ; k ++) {
        if (k === this.rows().length - 1) {
          if (this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(this.rows().length - 1,0))) {
            return true;
          }
        }
        if (this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(this.rows().length - 1,this.rows().length-1-k))) {
          return true;
        }
        if (this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(k,0))) { // Good
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

function check(bitStr){
  var bitInt = parseInt(bitStr,2)
      if( Math.log2(bitInt,2) === Math.floor(Math.log2(bitInt,2)) || bitInt === 0){
        return false;
      }
    return true; // Returns true when there is a conflict
}