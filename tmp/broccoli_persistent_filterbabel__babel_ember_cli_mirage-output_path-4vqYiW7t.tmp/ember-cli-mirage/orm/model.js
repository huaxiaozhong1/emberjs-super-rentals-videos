define('ember-cli-mirage/orm/model', ['exports', 'ember-cli-mirage/utils/normalize-name', 'ember-cli-mirage/utils/extend', 'ember-cli-mirage/assert', 'ember-cli-mirage/orm/collection', 'lodash/values'], function (exports, _emberCliMirageUtilsNormalizeName, _emberCliMirageUtilsExtend, _emberCliMirageAssert, _emberCliMirageOrmCollection, _lodashValues) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  /*
    The Model class. Notes:
  
    - We need to pass in modelName, because models are created with
      .extend and anonymous functions, so you cannot use
      reflection to find the name of the constructor.
  */

  /*
    Constructor
  */

  var Model = (function () {

    // TODO: schema and modelName now set statically at registration, need to remove

    function Model(schema, modelName, attrs, fks) {
      _classCallCheck(this, Model);

      (0, _emberCliMirageAssert['default'])(schema, 'A model requires a schema');
      (0, _emberCliMirageAssert['default'])(modelName, 'A model requires a modelName');

      this._schema = schema;
      this.modelName = modelName;
      this.fks = fks || [];
      attrs = attrs || {};

      this._setupAttrs(attrs);
      this._setupRelationships(attrs);

      return this;
    }

    /**
     * Creates or saves the model.
     * @method save
     * @return this
     * @public
     */

    _createClass(Model, [{
      key: 'save',
      value: function save() {
        var collection = (0, _emberCliMirageUtilsNormalizeName.toCollectionName)(this.modelName);

        if (this.isNew()) {
          // Update the attrs with the db response
          this.attrs = this._schema.db[collection].insert(this.attrs);

          // Ensure the id getter/setter is set
          this._definePlainAttribute('id');
        } else {
          this._schema.db[collection].update(this.attrs.id, this.attrs);
        }

        this._saveAssociations();

        return this;
      }

      /**
       * Update the record in the db.
       * @method update
       * @param {String} key
       * @param {String} val
       * @return this
       * @public
       */
    }, {
      key: 'update',
      value: function update(key, val) {
        var attrs = undefined;
        if (key == null) {
          return this;
        }

        if (typeof key === 'object') {
          attrs = key;
        } else {
          (attrs = {})[key] = val;
        }

        Object.keys(attrs).forEach(function (attr) {
          this._definePlainAttribute(attr);
          this[attr] = attrs[attr];
        }, this);

        this.save();

        return this;
      }

      /**
       * Destroys the db record
       * @method destroy
       * @public
       */
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this.isSaved()) {
          this._disassociateFromDependents();

          var collection = (0, _emberCliMirageUtilsNormalizeName.toCollectionName)(this.modelName);
          this._schema.db[collection].remove(this.attrs.id);
        }
      }

      /**
       * Boolean, true if the model has not been persisted yet to the db.
       *
       * Originally this method simply checked if the model had an id; however,
       * we let people create models with pre-specified ids. So, we have to
       * check whether the record is in the actual databse or not.
       *
       * @method isNew
       * @return {Boolean}
       * @public
       */
    }, {
      key: 'isNew',
      value: function isNew() {
        var hasDbRecord = false;
        var hasId = this.attrs.id !== undefined && this.attrs.id !== null;

        if (hasId) {
          var collectionName = (0, _emberCliMirageUtilsNormalizeName.toCollectionName)(this.modelName);
          var record = this._schema.db[collectionName].find(this.attrs.id);
          if (record) {
            hasDbRecord = true;
          }
        }

        return !hasDbRecord;
      }

      /**
       * Boolean, opposite of `isNew`
       * @method isSaved
       * @return {Boolean}
       * @public
       */
    }, {
      key: 'isSaved',
      value: function isSaved() {
        return !this.isNew();
      }

      /**
       * Reload a model’s data from the database.
       * @method reload
       * @return this
       * @public
       */
    }, {
      key: 'reload',
      value: function reload() {
        var _this = this;

        if (this.id) {
          (function () {
            var collection = (0, _emberCliMirageUtilsNormalizeName.toCollectionName)(_this.modelName);
            var attrs = _this._schema.db[collection].find(_this.id);

            Object.keys(attrs).filter(function (attr) {
              return attr !== 'id';
            }).forEach(function (attr) {
              this.attrs[attr] = attrs[attr];
            }, _this);
          })();
        }

        // Clear temp associations
        this._tempAssociations = {};

        return this;
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.attrs;
      }

      /**
       * Returns the association for the given key
       *
       * @method associationFor
       * @param key
       * @public
       */
    }, {
      key: 'associationFor',
      value: function associationFor(key) {
        return this._schema.associationsFor(this.modelName)[key];
      }

      /**
       * Returns the inverse association, if it exists
       *
       * @method inverseAssociationFor
       * @param key
       * @public
       */
    }, {
      key: 'inverseAssociationFor',
      value: function inverseAssociationFor(key) {
        return this.associationFor(key).inverse();
      }
    }, {
      key: 'associate',
      value: function associate(model, association) {
        var key = association.key;

        if (association.constructor.name === 'HasMany') {
          if (!this[key].includes(model)) {
            this[key].add(model);
          }
        } else {
          this[key] = model;
        }
      }
    }, {
      key: 'disassociate',
      value: function disassociate(model, association) {
        var fk = association.getForeignKey();

        if (association.constructor.name === 'HasMany') {
          var i = this[fk].map(function (key) {
            return key.toString();
          }).indexOf(model.id.toString());
          if (i > -1) {
            this.attrs[fk].splice(i, 1);
          }
        } else {
          this.attrs[fk] = null;
        }
      }

      // Private
      /**
       * model.attrs represents the persistable attributes, i.e. your db
       * table fields.
       * @method _setupAttrs
       * @param attrs
       * @private
       */
    }, {
      key: '_setupAttrs',
      value: function _setupAttrs(attrs) {
        var _this2 = this;

        // Verify no undefined associations are passed in
        Object.keys(attrs).filter(function (key) {
          var value = attrs[key];
          var isModelOrCollection = value instanceof Model || value instanceof _emberCliMirageOrmCollection['default'];
          var isArrayOfModels = Array.isArray(value) && value.length && value.every(function (item) {
            return item instanceof Model;
          });

          return isModelOrCollection || isArrayOfModels;
        }).forEach(function (key) {
          var modelOrCollection = attrs[key];

          (0, _emberCliMirageAssert['default'])(_this2.associationKeys.indexOf(key) > -1, 'You\'re trying to create a ' + _this2.modelName + ' model and you passed in a ' + modelOrCollection.toString() + ' under the ' + key + ' key, but you haven\'t defined that key as an association on your model.');
        });

        // Filter out association keys
        var hash = Object.keys(attrs).reduce(function (memo, key) {
          if (_this2.associationKeys.indexOf(key) === -1 && _this2.associationIdKeys.indexOf(key) === -1) {
            memo[key] = attrs[key];
          }
          return memo;
        }, {});

        // Ensure fks are there
        this.fks.map(function (fk) {
          hash[fk] = attrs[fk] !== undefined ? attrs[fk] : null;
        });

        this.attrs = hash;

        // define plain getter/setters for non-association keys
        Object.keys(hash).forEach(function (attr) {
          if (this.associationKeys.indexOf(attr) === -1 && this.associationIdKeys.indexOf(attr) === -1) {
            this._definePlainAttribute(attr);
          }
        }, this);
      }

      /**
       * Define getter/setter for a plain attribute
       * @method _definePlainAttribute
       * @param attr
       * @private
       */
    }, {
      key: '_definePlainAttribute',
      value: function _definePlainAttribute(attr) {

        // Ensure the property hasn't already been defined
        var existingProperty = Object.getOwnPropertyDescriptor(this, attr);
        if (existingProperty && existingProperty.get) {
          return;
        }

        // Ensure the attribute is on the attrs hash
        if (!this.attrs.hasOwnProperty(attr)) {
          this.attrs[attr] = null;
        }

        // Define the getter/setter
        Object.defineProperty(this, attr, {
          get: function get() {
            return this.attrs[attr];
          },
          set: function set(val) {
            this.attrs[attr] = val;
            return this;
          }
        });
      }

      /**
       * Foreign keys get set on attrs directly (to avoid potential recursion), but
       * model references use the setter.
       *
       * We validate foreign keys during instantiation.
       *
       * @method _setupRelationships
       * @param attrs
       * @private
       */
    }, {
      key: '_setupRelationships',
      value: function _setupRelationships(attrs) {
        var _this3 = this;

        var foreignKeysHash = Object.keys(attrs).reduce(function (memo, attr) {
          if (_this3.associationIdKeys.indexOf(attr) > -1 || _this3.fks.indexOf(attr) > -1) {
            memo[attr] = attrs[attr];
          }
          return memo;
        }, {});

        Object.keys(foreignKeysHash).forEach(function (attr) {
          var fk = foreignKeysHash[attr];
          if (fk !== undefined && fk !== null) {
            this._validateForeignKeyExistsInDatabase(attr, fk);
          }

          this.attrs[attr] = fk;
        }, this);

        var associationKeysHash = Object.keys(attrs).reduce(function (memo, attr) {
          if (_this3.associationKeys.indexOf(attr) > -1) {
            memo[attr] = attrs[attr];
          }
          return memo;
        }, {});
        Object.keys(associationKeysHash).forEach(function (attr) {
          this[attr] = associationKeysHash[attr];
        }, this);
      }

      /**
       * Originally we validated this via association.setId method, but it triggered
       * recursion. That method is designed for updating an existing model's ID so
       * this method is needed during instantiation.
       *
       * @method _validateForeignKeyExistsInDatabase
       * @private
       */
    }, {
      key: '_validateForeignKeyExistsInDatabase',
      value: function _validateForeignKeyExistsInDatabase(foreignKeyName, foreignKeys) {
        var _this4 = this;

        if (Array.isArray(foreignKeys)) {
          var associationModelName = Object.keys(this.hasManyAssociations).map(function (key) {
            return _this4.hasManyAssociations[key];
          }).filter(function (association) {
            return association.getForeignKey() === foreignKeyName;
          })[0].modelName;

          var found = this._schema.db[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(associationModelName)].find(foreignKeys);
          (0, _emberCliMirageAssert['default'])(found.length === foreignKeys.length, 'You\'re instantiating a ' + this.modelName + ' that has a ' + foreignKeyName + ' of ' + foreignKeys + ', but some of those records don\'t exist in the database.');
        } else {
          var associationModelName = Object.keys(this.belongsToAssociations).map(function (key) {
            return _this4.belongsToAssociations[key];
          }).filter(function (association) {
            return association.getForeignKey() === foreignKeyName;
          })[0].modelName;

          var found = this._schema.db[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(associationModelName)].find(foreignKeys);
          (0, _emberCliMirageAssert['default'])(found, 'You\'re instantiating a ' + this.modelName + ' that has a ' + foreignKeyName + ' of ' + foreignKeys + ', but that record doesn\'t exist in the database.');
        }
      }

      /**
       * Update associated children when saving a collection
       *
       * @method _saveAssociations
       * @private
       */
    }, {
      key: '_saveAssociations',
      value: function _saveAssociations() {
        this._saveBelongsToAssociations();
        this._saveHasManyAssociations();
      }
    }, {
      key: '_saveBelongsToAssociations',
      value: function _saveBelongsToAssociations() {
        var _this5 = this;

        (0, _lodashValues['default'])(this.belongsToAssociations).forEach(function (association) {
          _this5._disassociateFromOldInverses(association);
          _this5._saveNewAssociates(association);
          _this5._associateWithNewInverse(association);
        });
      }
    }, {
      key: '_saveHasManyAssociations',
      value: function _saveHasManyAssociations() {
        var _this6 = this;

        (0, _lodashValues['default'])(this.hasManyAssociations).forEach(function (association) {
          _this6._disassociateFromOldInverses(association);
          _this6._saveNewAssociates(association);
          _this6._associateWithNewInverses(association);
        });
      }
    }, {
      key: '_disassociateFromOldInverses',
      value: function _disassociateFromOldInverses(association) {
        if (association.constructor.name === 'HasMany') {
          this._disassociateFromHasManyInverses(association);
        } else if (association.constructor.name === 'BelongsTo') {
          this._disassociateFromBelongsToInverse(association);
        }
      }
    }, {
      key: '_disassociateFromHasManyInverses',
      value: function _disassociateFromHasManyInverses(association) {
        var _this7 = this;

        var key = association.key;

        var fk = association.getForeignKey();
        var inverse = association.inverse();
        var tempAssociation = this._tempAssociations && this._tempAssociations[key];
        var oldInversesExist = this.attrs[fk];

        if (inverse && tempAssociation && oldInversesExist) {
          // Disassociate currently persisted models that are no longer associated
          this._schema[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(association.modelName)].find(this.attrs[fk] || []) // TODO: prob should initialize hasMany fks with []
          .models.filter(function (model) {
            return !tempAssociation.includes(model);
          }) // filter out models that will still be associated
          .forEach(function (model) {
            model.disassociate(_this7, inverse);
            model.save();
          });
        }
      }
    }, {
      key: '_disassociateFromBelongsToInverse',
      value: function _disassociateFromBelongsToInverse(association) {
        var key = association.key;

        var fk = association.getForeignKey();
        var inverse = association.inverse();
        var tempAssociation = this._tempAssociations && this._tempAssociations[key];
        var oldInversesExist = this.attrs[fk];

        if (inverse && tempAssociation !== undefined && oldInversesExist) {
          // Disassociate currently persisted models that are no longer associated
          var model = this._schema[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(association.modelName)].find(this.attrs[fk]);

          model.disassociate(this, inverse);
          model._updateInDb(model.attrs);
        }
      }
    }, {
      key: '_disassociateFromDependents',
      value: function _disassociateFromDependents() {
        var _this8 = this;

        (0, _lodashValues['default'])(this._schema.dependentAssociationsFor(this.modelName)).forEach(function (association) {
          association.disassociateAllDependentsFromTarget(_this8);
        });
      }
    }, {
      key: '_saveNewAssociates',
      value: function _saveNewAssociates(association) {
        var key = association.key;

        var fk = association.getForeignKey();
        var tempAssociate = this._tempAssociations && this._tempAssociations[key];

        if (tempAssociate !== undefined) {
          this.__isSavingNewChildren = true;
          delete this._tempAssociations[key];

          if (tempAssociate instanceof _emberCliMirageOrmCollection['default']) {
            tempAssociate.models.forEach(function (child) {
              child.save();
            });

            this._updateInDb(_defineProperty({}, fk, tempAssociate.models.map(function (child) {
              return child.id;
            })));
          } else {

            if (tempAssociate === null) {
              this._updateInDb(_defineProperty({}, fk, null));
            } else {
              tempAssociate.save();
              this._updateInDb(_defineProperty({}, fk, tempAssociate.id));
            }
          }

          this.__isSavingNewChildren = false;
        }
      }
    }, {
      key: '_associateWithNewInverse',
      value: function _associateWithNewInverse(association) {
        var fk = association.getForeignKey();
        var inverse = association.inverse();

        if (this[fk] && inverse && inverse.constructor.name === 'BelongsTo' && !this.__isSavingNewChildren) {
          var inverseFk = inverse.getForeignKey();

          this._schema.db[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(association.modelName)].update(this[fk], _defineProperty({}, inverseFk, this.id));
        } else if (this[fk] && inverse && inverse.constructor.name === 'HasMany' && !this.__isSavingNewChildren) {
          var inverseFk = inverse.getForeignKey();
          var inverseCollection = this._schema.db[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(association.modelName)];
          var currentIdsForInverse = inverseCollection.find(this[fk])[inverse.getForeignKey()] || [];
          var newIdsForInverse = currentIdsForInverse;

          if (newIdsForInverse.indexOf(this.id) === -1) {
            newIdsForInverse.push(this.id);
          }

          inverseCollection.update(this[fk], _defineProperty({}, inverseFk, newIdsForInverse));
        }
      }
    }, {
      key: '_associateWithNewInverses',
      value: function _associateWithNewInverses(association) {
        var _this9 = this;

        var fk = association.getForeignKey();
        var inverse = association.inverse();

        // Associate new models
        if (inverse && inverse.constructor.name === 'HasMany' && !this.__isSavingNewChildren) {
          this._schema[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(association.modelName)].find(this[fk]).models.forEach(function (model) {
            var inverseFk = inverse.getForeignKey();
            var ownerId = _this9.id;
            var inverseCollection = _this9._schema.db[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(model.modelName)];
            var currentIdsForInverse = inverseCollection.find(model.id)[inverse.getForeignKey()] || [];
            var newIdsForInverse = currentIdsForInverse;

            if (newIdsForInverse.indexOf(ownerId) === -1) {
              newIdsForInverse.push(ownerId);
            }

            inverseCollection.update(model.id, _defineProperty({}, inverseFk, newIdsForInverse));
          });
        } else if (inverse && inverse.constructor.name === 'BelongsTo' && !this.__isSavingNewChildren) {
          this._schema[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(association.modelName)].find(this[fk]).models.forEach(function (model) {
            var inverseFk = inverse.getForeignKey();
            var ownerId = _this9.id;
            var inverseCollection = _this9._schema.db[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(model.modelName)];

            inverseCollection.update(model.id, _defineProperty({}, inverseFk, ownerId));
          });
        }
      }

      // Used to update data directly, since #save and #update can retrigger saves,
      // which can cause cycles with associations.
    }, {
      key: '_updateInDb',
      value: function _updateInDb(attrs) {
        this.attrs = this._schema.db[(0, _emberCliMirageUtilsNormalizeName.toCollectionName)(this.modelName)].update(this.attrs.id, attrs);
      }

      /**
       * Simple string representation of the model and id.
       * @method toString
       * @return {String}
       * @public
       */
    }, {
      key: 'toString',
      value: function toString() {
        return 'model:' + this.modelName + '(' + this.id + ')';
      }
    }]);

    return Model;
  })();

  Model.extend = _emberCliMirageUtilsExtend['default'];
  Model.findBelongsToAssociation = function (associationType) {
    return this.prototype.belongsToAssociations[associationType];
  };

  exports['default'] = Model;
});