define('lodash/defer', ['exports', 'lodash/_baseDelay', 'lodash/_baseRest'], function (exports, _lodash_baseDelay, _lodash_baseRest) {

  /**
   * Defers invoking the `func` until the current call stack has cleared. Any
   * additional arguments are provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to defer.
   * @param {...*} [args] The arguments to invoke `func` with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) {
   *   console.log(text);
   * }, 'deferred');
   * // => Logs 'deferred' after one millisecond.
   */
  var defer = (0, _lodash_baseRest['default'])(function (func, args) {
    return (0, _lodash_baseDelay['default'])(func, 1, args);
  });

  exports['default'] = defer;
});