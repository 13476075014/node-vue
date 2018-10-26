'use strict'
// 加的为了拉取网上的数据
// const express = require('express')
// const app = express()
const axios = require('axios')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        before (app) {
            // 获取推荐的轮播图数据
            app.get('/api/getRecommend', function (req, res) {
                const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://y.qq.com/m/index.html'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            // 获取推荐的歌曲数据
            app.get('/api/getDiscList', function (req, res) {
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://y.qq.com/'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            // 获取歌手页面的歌手信息数据
            app.get('/api/getSingerList', function (req, res) {
                    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
                    axios.get(url, {
                        headers: {
                            referer: 'https://c.y.qq.com/',
                            host: 'c.y.qq.com'
                        },
                        params: req.query
                    }).then((response) => {
                        res.json(response.data)
                    }).catch((e) => {
                        res.json({
                            ERR_OK: 1,
                            data: e
                        })
                    })
                })
                // 歌手页面的详情页面。获取歌手的详细信息数据
            app.get('/api/getSingerDetail', function (req, res) {
                const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            // 获取歌曲的vkey
            app.get('/api/getSongVkey', function (req, res) {
                const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            // 获取歌曲的歌词接口
            app.get('/api/getLyric', function (req, res) {
                const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    var ret = response.data
                    if (typeof ret === 'string') {
                        // 这里返回的数据是一个字符串格式的回调函数，要处理一下再返回
                        var reg = /^\w+\(({[^()]+})\)$/ // 匹配任意字符开头的一个或多个，两个括号，里面一个双括号，里面非括号的一个或多个字符
                        var matches = ret.match(reg) // 得到data里面匹配正则的部分
                        if (matches) {
                            ret = JSON.parse(matches[1]) // matches
                        }
                    }
                    res.json(ret)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            // 推荐页面点击列表获取的推荐歌单信息
            app.get('/api/getSongList', function (req, res) {
                const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            // 推荐页面点击列表获取的推荐歌单信息
            app.get('/api/getTopList', function (req, res) {
                const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            // 推荐页面点击列表的点击详情的歌曲列表页面
            app.get('/api/getTopListDetail', function (req, res) {
                const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            // 搜索页面获取热搜数据的接口
            app.get('/api/getHotKey', function (req, res) {
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })

            //  搜索的接口
            app.get('/api/getSearchData', function (req, res) {
                const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    res.json({
                        ERR_OK: 1,
                        data: e
                    })
                })
            })
        },
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
            ]
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})
