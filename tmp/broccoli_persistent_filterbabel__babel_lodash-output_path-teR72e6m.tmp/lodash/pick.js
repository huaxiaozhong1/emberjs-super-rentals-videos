define('lodash/pick', ['exports', 'lodash/_basePick', 'lodash/_flatRest'], function (exports, _lodash_basePick, _lodash_flatRest) {

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  var pick = (0, _lodash_flatRest['default'])(function (object, paths) {
    return object == null ? {} : (0, _lodash_basePick['default'])(object, paths);
  });

  exports['default'] = pick;
});