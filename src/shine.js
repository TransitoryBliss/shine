/**
 * @module Shine
 */

define('shine', function (factory) {	
	if (!window.$)
		throw new Error("Missing jQuery library.");


	// Keeps track of all the registered applications
	var STATE = {};
	STATE.applications = {};
	
	/**
	 * Application class.
	 * 
	 * @class Shine
	 * @static
	 * @param {String} name
	 * @param {Object} options	 
	 * @chainable
	 */
	function Shine(name, options) {		
		if (!name) 
			throw new Error("Missing name argument.");

		/**
		 * Default configuration
		 * 
		 * @private 
		 * @property {Object} defaults
		 */
		var defaults = {};

		/**
		 * Application name
		 * 
		 * @property name
		 * @type {name}
		 */
		this.name = name;
		/**
		 * @property options
		 * @type {object}
		 */
		this.options = defaults;
		/**
		 * Contains all model instances
		 * 
		 * @property models
		 * @type models 
		 * @default {}
		 */
		this.models = {};
		/**
		 * Contains all schema instances
		 * 
		 * @property schemas
		 * @type schemas
		 * @default {}
		 */
		this.schemas = {};
		$.extend(this.options, options);

		return this;
	};

	/**
	 * Creates a Shine application. 
	 * This also adds it to the 
	 * 
	 * @param  {string} name    Application name
	 * @param  {object} options 
	 * @return {Shine}          A new instance of Shine
	 */
	Shine.createApplication = function (name, options) {
		return STATE.applications[name] = new Shine(name, options);
	}

	/**
	 * @method createSchema
	 * @constructor
	 * @param  {string} name   the name of the schema
	 * @param  {object} obj 	 object  
	 * @return {Schema}        a new Schema instance
	 */
	Shine.prototype.createSchema = function (name, obj) {
		if (!name) 
			throw new Error("Missing name argument.");

		var schema = this.schemas[name] = new this.Schema(name, obj);
		return schema;
	};

	/**
	 * Creates a new Model based on the schema or object
	 * passed.
	 * 
	 * @method createModel
	 * @constructor
	 * @param  {string} 				name   the name of the schema
	 * @param  {object|Schema} 	obj 	 a schema instance or object configuring a new schema  
	 * @return {Model}        				 a new Model instance
	 */
	Shine.prototype.createModel = function (name, schema) {		
		if (!name) 
			throw new Error("Missing name argument.");
		
		schema = (typeof schema === typeof this.Schema) ? schema : this.createSchema(name, schema);		
		var model = this.models[name] = new this.Model(name, schema);
		return model;
	};

	Shine.prototype.$ = $;		

	Shine.prototype.Schema = require('./Schema');
	
	Shine.prototype.Model = require('./Model');	

	return Shine;
});
