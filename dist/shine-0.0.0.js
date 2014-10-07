;(function() {
var Schema, Model, shine;
Schema = function () {
  /**
  * Description
  * @method Schema
  * @return 
  */
  function Schema() {
  }
  return Schema;
}();
Model = function () {
  /**
  * Description
  * @method Model
  * @return 
  */
  function Model(schema) {
  }
  return Model;
}();
shine = function (factory) {
  if (!window.$)
    throw new Error('Missing jQuert library.');
  var defaults = { defaultProp: 'Yo' };
  /**
  * Shine application.
  * @method Shine
  * @param {string} name
  * @param {object} options
  * @return 
  */
  function Shine(name, options) {
    this.name = name;
    this.options = defaults;
    this.models = {};
    this.schemas = {};
    $.extend(this.options, options);
  }
  /**
  * Description
  * @method createSchema
  * @param {string} name
  * @param {object} schema
  * @return schema
  */
  Shine.prototype.createSchema = function (name, schema) {
    var schema = this.schemas[name] = new this.Schema(schema);
    return schema;
  };
  /**
  * Description
  * @method createModel
  * @param {} name
  * @param {} schema
  * @return model
  */
  Shine.prototype.createModel = function (name, schema) {
    schema = typeof schema === typeof this.Schema ? schema : this.createSchema(name, schema);
    var model = this.models[name] = new this.Model(schema);
    return model;
  };
  Shine.prototype.$ = $;
  Shine.prototype.Schema = Schema;
  Shine.prototype.Model = Model;
  return {
    /**
     * Description
     * @method createApplication
     * @param {} name
     * @param {} options
     * @return NewExpression
     */
    createApplication: function (name, options) {
      return new Shine(name, options);
    },
    Shine: Shine
  };
}({});
window.shine = shine;
}());