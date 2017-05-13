define('lodash/flattenDeep', ['exports', 'lodash/_baseFlatten'], function (exports, _lodash_baseFlatten) {

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Recursively flattens `array`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flattenDeep([1, [2, [3, [4]], 5]]);
   * // => [1, 2, 3, 4, 5]
   */
  function flattenDeep(array) {
    var length = array == null ? 0 : array.length;
    return length ? (0, _lodash_baseFlatten['default'])(array, INFINITY) : [];
  }

  exports['default'] = flattenDeep;
});