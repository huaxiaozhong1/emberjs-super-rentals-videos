define('lodash/conforms', ['exports', 'lodash/_baseClone', 'lodash/_baseConforms'], function (exports, _lodash_baseClone, _lodash_baseConforms) {

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1;

  /**
   * Creates a function that invokes the predicate properties of `source` with
   * the corresponding property values of a given object, returning `true` if
   * all predicates return truthy, else `false`.
   *
   * **Note:** The created function is equivalent to `_.conformsTo` with
   * `source` partially applied.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {Object} source The object of property predicates to conform to.
   * @returns {Function} Returns the new spec function.
   * @example
   *
   * var objects = [
   *   { 'a': 2, 'b': 1 },
   *   { 'a': 1, 'b': 2 }
   * ];
   *
   * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
   * // => [{ 'a': 1, 'b': 2 }]
   */
  function conforms(source) {
    return (0, _lodash_baseConforms['default'])((0, _lodash_baseClone['default'])(source, CLONE_DEEP_FLAG));
  }

  exports['default'] = conforms;
});