define('lodash/flatten', ['exports', 'lodash/_baseFlatten'], function (exports, _lodash_baseFlatten) {

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? (0, _lodash_baseFlatten['default'])(array, 1) : [];
  }

  exports['default'] = flatten;
});