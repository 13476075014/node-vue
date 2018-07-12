//这个是总的路由文件

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
    app.use("/users", require("./users"));
    app.use("/artical", require("./artical"))

}