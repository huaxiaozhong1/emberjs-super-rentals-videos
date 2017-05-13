define('lodash/valueOf', ['exports', 'lodash/wrapperValue'], function (exports, _lodashWrapperValue) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _lodashWrapperValue['default'];
    }
  });
});