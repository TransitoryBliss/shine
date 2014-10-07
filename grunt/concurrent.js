//
// Defines all the concurrent tasks. For more information on concurrent
// https://github.com/sindresorhus/grunt-concurrent
//

module.exports = {
	options: {
		logConcurrentOutput: true
	},
	amdclean: ["requirejs:amdclean"],
	watch: ["watch:scripts", "connect"]
}