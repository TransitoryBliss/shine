//
// Configuration file for the karma test runner
//

module.exports = function (config) {
  config.set({
    frameworks: ['qunit', 'requirejs'],
    plugins: ['karma-requirejs', 'karma-qunit', 'karma-phantomjs-launcher'],
    port: 9876,
    singleRun: true,
    // list of files / patterns to load in the browser
    files: [
        {pattern: 'lib/**/*.js', included: true},
        {pattern: 'src/**/*.js', included: false},
        {pattern: 'test/**/*Spec.js', included: false},

        'test/main-test.js'
    ],
    reporters: ['dots']
  });
};