/**
 * @module Shine
 */

define(['Router', 'Model', 'Schema'], function (Router, Model, Schema) {	
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
		 * @type {object} 
		 * @default {}
		 */
		this.models = {};
		/**
		 * Contains all router instances
		 * 
		 * @property routers
		 * @type {objects} 
		 * @default {}
		 */
		this.routers = {};		
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

	Shine.$ = window.$;	


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
	};

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
	 * @method createRouter
	 * @constructor
	 * @param  {string} name   the name of the router
	 * @return {Router}        a new Router instance
	 */
	Shine.prototype.createRouter = function (name) {
		if (!name) 
			throw new Error("Missing name argument.");

		var router = this.routers[name] = new Router();
		return router;
	};	

	/**
	 * Get model by name
	 * 	 
	 * @method  model
	 * @param  {String} name name of model to return
	 * @chainable
	 * @return {Model}      an existing model instance
	 */
	Shine.prototype.model = function (name) {				
		return this.models[name];		
	};	
	/**
	 * Get router by name
	 * 
	 * @method  router
	 * @param  {String} name name of router to return
	 * @chainable
	 * @return {Router}      an existing router instance
	 */
	Shine.prototype.router = function (name) {		
		return this.routers[name];		
	};	
	/**
	 * Get schema by name
	 * 
	 * @method  schema
	 * @param  {String} name 	name of schema to return
	 * @return {Schema}      	an existing schema instance
	 */
	Shine.prototype.schema = function (name) {		
		return this.schemas[name];		
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

	

	Shine.prototype.Schema = Schema;
	Shine.prototype.Model = Model;
	Shine.prototype.Router = Router;

	return Shine;
});
