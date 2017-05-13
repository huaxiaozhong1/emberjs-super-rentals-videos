define('lodash/snakeCase', ['exports', 'lodash/_createCompounder'], function (exports, _lodash_createCompounder) {

  /**
   * Converts `string` to
   * [snake case](https://en.wikipedia.org/wiki/Snake_case).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the snake cased string.
   * @example
   *
   * _.snakeCase('Foo Bar');
   * // => 'foo_bar'
   *
   * _.snakeCase('fooBar');
   * // => 'foo_bar'
   *
   * _.snakeCase('--FOO-BAR--');
   * // => 'foo_bar'
   */
  var snakeCase = (0, _lodash_createCompounder['default'])(function (result, word, index) {
    return result + (index ? '_' : '') + word.toLowerCase();
  });

  exports['default'] = snakeCase;
});