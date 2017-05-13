define('lodash/_baseMean', ['exports', 'lodash/_baseSum'], function (exports, _lodash_baseSum) {

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (0, _lodash_baseSum['default'])(array, iteratee) / length : NAN;
  }

  exports['default'] = baseMean;
});