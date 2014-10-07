//
// Builds the shine src  
//

var pkg = require('../package.json');


//
// Define all path aliases
// 
var require_paths = {
  "shine": "shine"
}

module.exports = {
	amdclean: {
        options: {
          paths: require_paths,
          'baseUrl': 'src/',
          'name': 'shine',
          'optimize': 'none',
          'out': 'dist/shine-'+pkg.version+'.js',
          'onModuleBundleComplete': function (data) {
            var fs = require('fs'),
              amdclean = require('amdclean'),
              outputFile = data.path;

            fs.writeFileSync(outputFile, amdclean.clean({
              'globalModules': ['shine'],
              'filePath': outputFile
            }));
          }
        }
    }
}