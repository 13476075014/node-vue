// node的入口文件
const exp = require('express')
const express = exp()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/bundle.server.js')['default']

// 设置静态文件目录
express.use('/', exp.static(__dirname + '/dist'))

const clientBundleFileUrl = '/bundle.client.js'

// 写一个本地请求，模拟前端数据请求
express.get('/api/getHomeInfo', (req, res) => {
    res.send('ssr后台请求的数据')
})


express.get('*', (req, res) => {
    const context = { url: req.url }

    // 创建vue实例，传入请求路由信息
    createApp(context).then(app => {
        let state = JSON.stringify(context.state) // 获取到在entry-server.js中得到的服务端的vuex的state，赋值在参数context上的，获取这个值，在后面联通服务端的vuex和客户端的vuex
        renderer.renderToString(app).then(html => {
            res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <title>Vue2.0 SSR渲染页面</title>
                            <script>window.__INITIAL_STATE__ = ${state}</script>
                            <script src="${clientBundleFileUrl}"></script>
                        </head>
                        <body>
                            <div id="app">${html}</div>
                        </body>
                    </html>
            `)
        }).catch(err => {
            console.log(err)
            res.writeHead({ 'Content-Type': 'text/html;charset=utf-8' })
            return res.status(500).end('运行时错误')
        })
    }, err => {
        if (err.code === 404) { res.status(404).end('没有这个页面') }
    })
})

express.listen(9900, () => {
    console.log('启动啦')
})