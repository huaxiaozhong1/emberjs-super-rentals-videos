define('lodash/_freeGlobal', ['exports'], function (exports) {
  /** Detect free variable `global` from Node. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  exports['default'] = freeGlobal;
});