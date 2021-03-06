define('lodash/reduce', ['exports', 'lodash/_arrayReduce', 'lodash/_baseEach', 'lodash/_baseIteratee', 'lodash/_baseReduce', 'lodash/isArray'], function (exports, _lodash_arrayReduce, _lodash_baseEach, _lodash_baseIteratee, _lodash_baseReduce, _lodashIsArray) {

  /**
   * Reduces `collection` to a value which is the accumulated result of running
   * each element in `collection` thru `iteratee`, where each successive
   * invocation is supplied the return value of the previous. If `accumulator`
   * is not given, the first element of `collection` is used as the initial
   * value. The iteratee is invoked with four arguments:
   * (accumulator, value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.reduce`, `_.reduceRight`, and `_.transform`.
   *
   * The guarded methods are:
   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
   * and `sortBy`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @returns {*} Returns the accumulated value.
   * @see _.reduceRight
   * @example
   *
   * _.reduce([1, 2], function(sum, n) {
   *   return sum + n;
   * }, 0);
   * // => 3
   *
   * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
   *   (result[value] || (result[value] = [])).push(key);
   *   return result;
   * }, {});
   * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
   */
  function reduce(collection, iteratee, accumulator) {
    var func = (0, _lodashIsArray['default'])(collection) ? _lodash_arrayReduce['default'] : _lodash_baseReduce['default'],
        initAccum = arguments.length < 3;

    return func(collection, (0, _lodash_baseIteratee['default'])(iteratee, 4), accumulator, initAccum, _lodash_baseEach['default']);
  }

  exports['default'] = reduce;
});