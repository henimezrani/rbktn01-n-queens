// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
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

    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    hasRowConflictAt: function(rowIndex) {
      var bitStr = this.rows()[rowIndex].join('');
      return check(bitStr); // fixme
    },

    hasAnyRowConflicts: function() {
      for (var i = 0 ; i < this.rows().length ; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    hasColConflictAt: function(colIndex) {
      var bitStr = '';
      for (var i = 0 ; i < this.rows().length ; i++ ) {
        bitStr += this.rows()[i][colIndex]
      }
      return check(bitStr);
     
    },

    hasAnyColConflicts: function() {
      for (var i = 0 ; i < this.rows().length ; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

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