// 这个是尝试在vue通过webpack打包好服务端js和客户端js后的，后端运行文件


//built-server-bundle.js这个是webpack打包后的服务端代码vue
const createApp = require('/path/to/built-server-bundle.js')

server.get('*', (req, res) => {
    const context = { url: req.url }
})