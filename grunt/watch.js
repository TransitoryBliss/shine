//
// Grunt watcher, useful while developing.
//

module.exports = {
	scripts: {
		options: {
			livereload: true
		},
		files: ["index.html", "src/**/*.js"],
		tasks: ["build"]	
	}
}