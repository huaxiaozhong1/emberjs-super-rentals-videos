define('lodash/over', ['exports', 'lodash/_arrayMap', 'lodash/_createOver'], function (exports, _lodash_arrayMap, _lodash_createOver) {

  /**
   * Creates a function that invokes `iteratees` with the arguments it receives
   * and returns their results.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {...(Function|Function[])} [iteratees=[_.identity]]
   *  The iteratees to invoke.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var func = _.over([Math.max, Math.min]);
   *
   * func(1, 2, 3, 4);
   * // => [4, 1]
   */
  var over = (0, _lodash_createOver['default'])(_lodash_arrayMap['default']);

  exports['default'] = over;
});