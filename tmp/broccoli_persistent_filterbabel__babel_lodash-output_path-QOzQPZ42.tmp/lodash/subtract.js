define('lodash/subtract', ['exports', 'lodash/_createMathOperation'], function (exports, _lodash_createMathOperation) {

  /**
   * Subtract two numbers.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {number} minuend The first number in a subtraction.
   * @param {number} subtrahend The second number in a subtraction.
   * @returns {number} Returns the difference.
   * @example
   *
   * _.subtract(6, 4);
   * // => 2
   */
  var subtract = (0, _lodash_createMathOperation['default'])(function (minuend, subtrahend) {
    return minuend - subtrahend;
  }, 0);

  exports['default'] = subtract;
});