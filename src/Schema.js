define(['schema/ObjectID'], function (ObjectID) {
	/**
	 * @class Schema
   	 * @namespace Shine 
   	 * @param {string} name Schema name
   	 * @param {schemaObject} {object} obj
	 * @chainable
	 */
	function Schema(name, schemaObject) {
		this.name = name;
		this.schemaObject = schemaObject || {};
  		this.attributes = {};
  		this.add(this.schemaObject);
  	};  	

  	Schema.prototype.add = function (obj) {

  	};

    Schema.ObjectID = ObjectID;

	return Schema;
});