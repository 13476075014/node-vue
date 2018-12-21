const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    // 设置一个模板注入页面
    template: require('fs').readFileSync('./src/components/index.template.html', 'utf-8')
})





server.get('*', (req, res) => {
    const app = new Vue({ //这个是模拟的如果是vue生成的模板
        data: {
            url: req.url
        },
        template: `<div>访问的URL是：{{url}}</div>`
    })

    const context = { // 设置一个变量，可以在注入的模板html中，进行插值
        title: "chunchun",
        meta: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
    }

    renderer.renderToString(app, context).then(html => {
        res.end(html) // 这个时候因为在前面已经创建了模板注入文件，所以这个时候是不需要再手动写基本的html标签，直接用返回来的值，就包含了这些
    }).catch(err => {
        res.writeHead({ 'Content-Type': 'text/html;charset=utf-8' })
        res.status(500).end('错误')
    })
})
server.listen(8800, () => {
    console.log("启动了")
})