define(function () {
	/**
	 * Description
	 * @method Model
	 * @param {} schema
	 * @return 
	 */
	function Model(name, schema) {		
		this.name = name;
    this.schema = schema || null;
  };
	return Model;
});