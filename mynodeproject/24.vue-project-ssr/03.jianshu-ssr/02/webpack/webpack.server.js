// 打包成服务端使用的，webpack配置文件
const path = require('path')
const projectRoot = path.resolve(__dirname, '..') // 获取根目录地址

module.exports = {
    target: 'node', // 告诉webpack打包出来是要用在node环境下，要符合node规范
    entry: ['babel-polyfill', path.join(projectRoot, 'entry/entry-server.js')],
    output: {
        libraryTarget: 'commonjs2', //以什么环境暴露这个打包后的文件，就是怎么挂载，外界怎么获取,
        path: path.join(projectRoot, 'dist'), // 打包后输出的位置
        filename: 'bundle.server.js' // 打包的文件名，打包成这个文件名
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader' // 感叹号是分割符号，表示后面的也是要参与的loader
            }
        ]
    },
    plugins: [],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js'
        }
    }
}