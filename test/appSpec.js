define(['shine'], function (shine) {  
  

  module('shine', {
    setup: function () {      
      // ...
    }
  });

  test("createApplication()", function () {    
    var app = shine.createApplication('app'); 
    ok(app);
    ok(app instanceof shine, "createApplication() returns Shine instance");
    equal(app.name, 'app', "createApplication() should set name property");
  })

  test("createApplication() with options", function () {
    var app = shine.createApplication('testApp', { testProperty: 'value' });    
    equal(app.options.testProperty, "value", "extends options");
  });

  test("createApplication() without name", function () {
    throws(function () {
      shine.createApplication()
    } , "throws error without name argument");
  });

  test("createModel() without schema instance", function () {
    var app = shine.createApplication('app');    
    var testModelOne = app.createModel('testModelOne', {});    
    ok(testModelOne);
    ok(testModelOne instanceof app.Model, "returns Model instance");
    ok(app.models.testModelOne.schema instanceof app.Schema, "automatically creates schema instance if object passed");    
  });

  test("createModel() with schema instance", function () {    
    var app = shine.createApplication('app');
    var testSchema = app.createSchema({});
    var testModelTwo = app.createModel('testModelTwo', testSchema);
    ok(app.models.testModelTwo.schema instanceof app.Schema, "accepts schema instance");
  });

  test("createModel() without name", function () {
    var app = shine.createApplication('app');
    throws(function () {
      app.createModel();
    } , "throws error without name argument");
  });

  test("createSchema() with name and no schema", function () {
    var app = shine.createApplication('app');
    var testSchemaOne = app.createSchema('testSchemaOne', {});    
    ok(testSchemaOne);
  });  

  test("createSchema() with schema", function () {
    var app = shine.createApplication('app');
    var testSchemaOne = app.createSchema('testSchemaOne', {
      name: {
        type: String
      }
    });
    ok(testSchemaOne);
  })

  test("createSchema() without name", function () {
    var app = shine.createApplication('app');
    throws(function () {
      app.createSchema();
    } , "throws error without name argument");
  });  

  test("model()", function () {
    var app = shine.createApplication('app');
    equal($.type( app.model('nonexisting') ), 'undefined', "returns undefined if non existing model");
    app.createModel('testModelOne', {});
    ok(app.model('testModelOne') instanceof app.Model, "returns model if existing");
  });

  test("schema()", function () {
    var app = shine.createApplication('app');
    equal($.type( app.schema('nonexisting') ), 'undefined', "returns undefined if non existing schema");
    app.createSchema('testSchemaOne', {});
    ok(app.schema('testSchemaOne') instanceof app.Schema, "returns schema if existing");
  });

  test("router()", function () {
    var app = shine.createApplication('app');
    equal($.type( app.router('nonexisting') ), 'undefined', "returns undefined if non existing router");
    app.createRouter('testRouterOne', {});
    ok(app.router('testRouterOne') instanceof app.Router, "returns router if existing");
  });  
});