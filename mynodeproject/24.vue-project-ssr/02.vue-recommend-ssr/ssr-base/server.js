    const Vue = require('vue')
    const server = require('express')()
    const renderer = require('vue-server-renderer').createRenderer()

    server.get('*', (req, res) => {
        const app = new Vue({
            data: {
                url: req.url
            },
            template: `<div>访问的URL是：{{url}}</div>`
        })


        renderer.renderToString(app).then(html => {
            res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>这是ssr</title>
            </head>
            <body>${html}</body>
        </html>
        `)
        }).catch(err => {
            res.status(500).end('错误')
        })
    })
    server.listen(8800, () => {
        console.log("启动了")
    })