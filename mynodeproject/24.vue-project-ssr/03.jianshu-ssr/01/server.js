const Vue = require('vue')
const express = require('express')()
const renderer = require('vue-server-renderer').createRenderer()


const app = new Vue({ // 创建vue实例
    template: '<div>hello world</div>'
})

express.get('/', (req, res) => {
    renderer.renderToString(app, (err, html) => { // 把上面的vue渲染成html直接倒到body中.输出。
        if (err) { return res.state(500).end('运行时错误') }

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Vue2.0 SSR渲染</title>
                </head>
                <body>
                    ${html}
                </body>
            </html>
        `)
    })
})

express.listen(8080, () => {
    console.log()
})