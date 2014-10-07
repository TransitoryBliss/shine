define(function () {
	/**
	 * @class Model
	 * @namespace  Shine 
	 * @param {Schema} schema Schema instance
	 * @chainable
	 */
	function Model(name, schema) {		
		this.name = name;
    this.schema = schema || null;
  };
	return Model;
});