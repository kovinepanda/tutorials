module.exports = function(env, argv) {
    if (argv.mode === undefined) {
        argv.mode = "development"
    }

    return require(`./webpack/${argv.mode}.js`)
}
