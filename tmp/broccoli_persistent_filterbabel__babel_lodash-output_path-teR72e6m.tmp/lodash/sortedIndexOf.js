define('lodash/sortedIndexOf', ['exports', 'lodash/_baseSortedIndex', 'lodash/eq'], function (exports, _lodash_baseSortedIndex, _lodashEq) {

  /**
   * This method is like `_.indexOf` except that it performs a binary
   * search on a sorted `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
   * // => 1
   */
  function sortedIndexOf(array, value) {
    var length = array == null ? 0 : array.length;
    if (length) {
      var index = (0, _lodash_baseSortedIndex['default'])(array, value);
      if (index < length && (0, _lodashEq['default'])(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  exports['default'] = sortedIndexOf;
});