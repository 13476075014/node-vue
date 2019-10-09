// karma.conf.js

var webpackConfig = require('./webpack.config.js')

module.exports = function(config) { //对外暴露一个函数
    config.set({
        frameworks: ['mocha'],
        files: ['test/**/*.spec.js'],
        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        reporters: ['spec'],
        browsers: ['Chrome']
    })
}