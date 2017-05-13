define('super-rentals/components/list-filter', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend({
    classNames: ['list-filter'],
    value: '',

    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);
      this.get('filter')('').then(function (results) {
        return _this.set('results', results);
      });
    },


    actions: {
      handleFilterEntry: function handleFilterEntry() {
        var _this2 = this;

        var filterInputValue = this.get('value');
        var filterAction = this.get('filter');
        filterAction(filterInputValue).then(function (filterResults) {
          return _this2.set('results', filterResults);
        });
      }
    }

  });
});