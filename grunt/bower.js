//
// Grunt task for easier bower..
//
module.exports = {
    install: {
        options: {
            targetDir: './lib',
            layout: 'byType',
            install: true,
            verbose: false,
            cleanTargetDir: false,
            cleanBowerDir: true,
            bowerOptions: {}
        }
    }
}