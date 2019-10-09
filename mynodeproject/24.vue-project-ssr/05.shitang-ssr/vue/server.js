const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')
const template = require('fs').readFileSync('./src/ssr/template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const render = createBundleRenderer(serverBundle, {
    template,
    clientManifest
})

server.get('*', (req, res) => {
    const context = {
        url: req.url
    }
    console.log(context.url)
    render.renderToString(context).then(html => {
        console.log(html)
        res.send(html)
    }).catch(err => {
        console.log(err)
            // res.send('hhhh')
        res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
        res.end('错误')
    })
})

server.listen(8800, () => {
    console.log("启动了")
})