define(['shine'], function (shine) {  
  module('shine', {
    setup: function () {      
      //...     
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

});