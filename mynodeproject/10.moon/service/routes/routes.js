// 主要的路由文件

module.exports = function(app) {
    app.use('/', require('./index'))
    app.use('/users', require('./users'))
    app.use('/ModelMakeUp', require('./ModelMakeUp')) //加这个
    app.use('/shopCar', require('./shopCar')) //加这个
}