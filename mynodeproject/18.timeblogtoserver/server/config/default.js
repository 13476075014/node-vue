// 这个文件主要是配置文件，插件config-lite会根据启动时的环境来读取要使用哪个config文件里的哪一个作为使用文件，default是默认文件，启动时的环境会和这个文件里面的内容合并，后面的可以覆盖这个文件里面的内容

module.exports = {
    port: 3000, //端口号
    url: "localhost:3000",
    session: { //session配置
        secret: 'chunchun', //设置 session 签名
        name: 'chunchun',
        cookie: {
            maxAge: 60 * 1000 * 60 * 24
        }, // 储存的时间 24小时
        resave: false, // 每次请求都重新设置session
        saveUninitialized: true
    },
    //mongodb: "mongodb://10.203.1.87:27017/Timeblog" //mongo的连接地址配置
    mongodb: "mongodb://localhost:27017/Timeblog" //mongo的连接地址配置
}