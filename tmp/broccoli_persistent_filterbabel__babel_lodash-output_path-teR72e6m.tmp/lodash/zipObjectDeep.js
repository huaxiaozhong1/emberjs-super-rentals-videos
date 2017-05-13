define('lodash/zipObjectDeep', ['exports', 'lodash/_baseSet', 'lodash/_baseZipObject'], function (exports, _lodash_baseSet, _lodash_baseZipObject) {

  /**
   * This method is like `_.zipObject` except that it supports property paths.
   *
   * @static
   * @memberOf _
   * @since 4.1.0
   * @category Array
   * @param {Array} [props=[]] The property identifiers.
   * @param {Array} [values=[]] The property values.
   * @returns {Object} Returns the new object.
   * @example
   *
   * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
   * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
   */
  function zipObjectDeep(props, values) {
    return (0, _lodash_baseZipObject['default'])(props || [], values || [], _lodash_baseSet['default']);
  }

  exports['default'] = zipObjectDeep;
});