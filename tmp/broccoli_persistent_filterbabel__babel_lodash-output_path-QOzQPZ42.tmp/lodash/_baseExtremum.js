define('lodash/_baseExtremum', ['exports', 'lodash/isSymbol'], function (exports, _lodashIsSymbol) {

  /**
   * The base implementation of methods like `_.max` and `_.min` which accepts a
   * `comparator` to determine the extremum value.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The iteratee invoked per iteration.
   * @param {Function} comparator The comparator used to compare values.
   * @returns {*} Returns the extremum value.
   */
  function baseExtremum(array, iteratee, comparator) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      var value = array[index],
          current = iteratee(value);

      if (current != null && (computed === undefined ? current === current && !(0, _lodashIsSymbol['default'])(current) : comparator(current, computed))) {
        var computed = current,
            result = value;
      }
    }
    return result;
  }

  exports['default'] = baseExtremum;
});