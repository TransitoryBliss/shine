//
// Tasks can be found in ./grunt
// 
// For more information how to configure using load-grunt-config check out 
// https://www.npmjs.org/package/load-grunt-config
// 

module.exports = function (grunt) {
	//
	//
	// Time tasks.
	require('time-grunt')(grunt);
	
	//
	// ./grunt 
	//
	require('load-grunt-config')(grunt);
};