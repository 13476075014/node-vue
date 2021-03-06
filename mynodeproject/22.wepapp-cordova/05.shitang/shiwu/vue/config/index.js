'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: '10.202.2.112', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
         * Source Maps
         */

    // https://webpack.js.org/configuration/devtool/#development
    // devtool: 'cheap-module-eval-source-map', // 原来的
    devtool: 'source-map', // 为了能在vscode上面调试改的

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../www/index.html'), // 打包后替换原来cordova的index文件

    // Paths
    assetsRoot: path.resolve(__dirname, '../../www'),
    assetsSubDirectory: '',
    assetsPublicPath: './',

    /**
         * Source Maps
         */

    productionSourceMap: false, // 是一个参数在后面webpack打包的时候设置webpack的source map ，这个属性是来指定是否需要追踪报错的原文件位置。如果在正式环境中不需要去找到报错位置，这里可以设置成false，减小打包的文件大小，优化加载速度。
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map', // 生成source map的方法，是否用这个由上面的productionSourceMap决定。

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
