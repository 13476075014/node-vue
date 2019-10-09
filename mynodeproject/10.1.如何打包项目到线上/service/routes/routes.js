// 主要的路由文件

module.exports = function(app) {
    app.use('/', require('./index'))
    app.use('/users', require('./users'))
        //app.use('/ModelUser', require('./ModelUser'))
    app.use('/ModelMakeUp', require('./ModelMakeUp'))
}