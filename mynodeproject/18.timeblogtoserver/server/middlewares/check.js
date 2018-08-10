module.exports = {

    //验证当没有登录的时候返回到登录
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.send({ state: -4, msg: "请登录后再操作" })
        }
        next()
    },


    //当需要验证已经登录的话，就跳到之前页面
    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.send({ state: -4, msg: "已经登录了，请退出后再操作" })
        }
        next()
    }
}