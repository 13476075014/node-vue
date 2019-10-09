const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('../../../build/webpack.base.conf')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  entry: './src/ssr/build/entry-server.js', // 入口文件
  target: 'node', // 告诉要用在那个环境上
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2' // 告诉webpack用什么规范对外暴露文件
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
