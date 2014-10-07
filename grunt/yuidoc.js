var pkg = require('../package.json');
module.exports =  {
    compile: {
		name: pkg.name,
		description: pkg.description,
		version: pkg.version,		
		options: {
			paths: 'src',			
			outdir: 'docs',
			extension: '.js',
			themedir: "node_modules/yuidoc-marviq-theme",
			helpers: [ "node_modules/yuidoc-marviq-theme/helpers/helpers.js" ]
		}
	}
}