define('shine', function (factory) {	

	if (!window.$)
		throw new Error("Missing jQuert library.");

	var defaults = {
		defaultProp: "Yo"
	};

	/**
	 * Shine application.
	 * @class Shine
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
	};



	Shine.prototype.createSchema = function (name, schema) {
		var schema = this.schemas[name] = new this.Schema(schema);
		return schema;
	};

	Shine.prototype.createModel = function (name, schema) {
		schema = (typeof schema === typeof this.Schema) ? schema : this.createSchema(name, schema);		
		var model = this.models[name] = new this.Model(schema);
		return model;
	}

	Shine.prototype.$ = $;		

	Shine.prototype.Schema = require('./Schema');
	Shine.prototype.Model = require('./Model');

	return {
		createApplication: function (name, options) {
			return new Shine(name, options);
		},
		Shine: Shine
	};
});
