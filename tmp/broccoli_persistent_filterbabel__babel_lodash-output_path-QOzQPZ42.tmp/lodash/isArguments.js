define('lodash/isArguments', ['exports', 'lodash/_baseIsArguments', 'lodash/isObjectLike'], function (exports, _lodash_baseIsArguments, _lodashIsObjectLike) {

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = (0, _lodash_baseIsArguments['default'])((function () {
    return arguments;
  })()) ? _lodash_baseIsArguments['default'] : function (value) {
    return (0, _lodashIsObjectLike['default'])(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };

  exports['default'] = isArguments;
});