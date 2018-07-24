module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            '**/*.spec.js'
        ],
        preprocessors: {
            '**/*.spec.js': [ 'webpack' ]
        },
        webpack: require('../webpack.config'),
        browsers: ['PhantomJS']
    })
}