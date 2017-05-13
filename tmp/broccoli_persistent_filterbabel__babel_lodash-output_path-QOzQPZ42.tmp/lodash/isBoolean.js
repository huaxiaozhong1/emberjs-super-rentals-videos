define('lodash/isBoolean', ['exports', 'lodash/_baseGetTag', 'lodash/isObjectLike'], function (exports, _lodash_baseGetTag, _lodashIsObjectLike) {

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]';

  /**
   * Checks if `value` is classified as a boolean primitive or object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
   * @example
   *
   * _.isBoolean(false);
   * // => true
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false || (0, _lodashIsObjectLike['default'])(value) && (0, _lodash_baseGetTag['default'])(value) == boolTag;
  }

  exports['default'] = isBoolean;
});