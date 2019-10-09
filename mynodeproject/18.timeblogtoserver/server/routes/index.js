//这个是总的路由文件

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        // res.render('index', { title: 'Express' });
        res.redirect("/index.html")
    });
    app.use("/users", require("./users"));
    app.use("/artical", require("./artical"));
    app.use("/comment", require("./comment"));

}