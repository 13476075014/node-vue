const webpack = require("wepack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //
module.exports = {
  entry:"../index.ts",
  output:{
    pathname:"../../dist",
    filename:"main.js"
  },
  resolve:{
    extensions:[".ts",".tsx",".js"]//页面中可以省略这些后缀名就引入文件
  },
  modules:{
    rules:{
      test:/\.tsx?$/,
      use:"ts-loader",
      exclude:/node_modules/
    }
  },
  devtool:process.env.NODE_ENV == "development" ? "inline-source-map" : false,//source-map的打包类型，正式环境一般false不需要来提升打包速度，测试环境需要来定位问题
  plugin:[
    new CleanWebpackPlugin({

    })
  ]
}