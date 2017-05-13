define('lodash/_castRest', ['exports', 'lodash/_baseRest'], function (exports, _lodash_baseRest) {

  /**
   * A `baseRest` alias which can be replaced with `identity` by module
   * replacement plugins.
   *
   * @private
   * @type {Function}
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  var castRest = _lodash_baseRest['default'];

  exports['default'] = castRest;
});