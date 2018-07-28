module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
        '**/*.spec.js'
        ],
        preprocessors: {  
        '**/*.spec.js': [ 'webpack', 'sourcemap' ]  
        },
        webpack: require('../webpack.config.js'),
        browsers: ['PhantomJS']
    })
}