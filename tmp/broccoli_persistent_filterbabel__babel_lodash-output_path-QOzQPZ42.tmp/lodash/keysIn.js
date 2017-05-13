define('lodash/keysIn', ['exports', 'lodash/_arrayLikeKeys', 'lodash/_baseKeysIn', 'lodash/isArrayLike'], function (exports, _lodash_arrayLikeKeys, _lodash_baseKeysIn, _lodashIsArrayLike) {

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return (0, _lodashIsArrayLike['default'])(object) ? (0, _lodash_arrayLikeKeys['default'])(object, true) : (0, _lodash_baseKeysIn['default'])(object);
  }

  exports['default'] = keysIn;
});