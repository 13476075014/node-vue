var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var handler = require('./dbhandler.js');

//极客验证
var slide = require('../public/javascripts/slide.js');

router.get("/gt/register-slide", function(req, res) {
    // 向极验申请每次验证所需的challenge
    slide.register(null, function(err, data) {
        if (err) {
            console.error(err);
            res.status(500);
            res.send(err);
            return;
        }

        if (!data.success) {
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});



/* GET users listing. */
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    slide.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode
    }, function(err, success) {

        if (err) {
            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        } else { //验证成功后就对账号密码进行验证

            /*res.send({
                status: "success",
                info: '登录成功'
            });*/
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('base64');
            handler(req, res, "login", "user", { username: req.body.username }, function(data) {
                if (data.length === 0) { //没有这个账号
                    res.send({
                        status: "error",
                        info: "账号或密码错误"
                    });
                } else if (data[0].pass !== password) {
                    res.send({
                        status: "error",
                        info: "账号或密码错误"
                    });
                } else if (data.length !== 0 && data[0].pass === password) {
                    req.session.username = username; //存session
                    req.session.password = password; //存密码
                    req.session._id = data[0]._id;
                    res.send({
                        status: "success",
                        info: "成功"
                    });
                }

            });
        }
    });


});


/* 注册接口 */
router.post('/register', function(req, res, next) {
    var user = req.body.user;
    delete(user["pass2"]);
    var md5 = crypto.createHash('md5');
    req.body.user.pass = md5.update(req.body.user.pass).digest('base64'); //对密码加密

    //查询是否这个账号已经存在，需要更换账号去注册
    handler(req, res, "find", "user", { 'username': user.username }, function(data) {
        if (data.length == 0) { //没有找到有相同用户民的；
            handler(req, res, "add", "user", user, function(data) {
                if (data.length == 0) {
                    res.end('{"err":"抱歉，添加失败"}');
                } else {
                    res.end('{"success":"添加成功"}');
                }
            });
        } else { //账号已经存在了
            res.end('{"err":"抱歉，添加失败，这个账号已经存在了！"}');
        }
    })



})

/*分页的接口 */
router.post('/getpage', function(req, res, next) {
    console.log(req.body)
    var page = req.body.page || 1; //当前页数
    var rows = req.body.rows || 5; //一页显示的条数
    handler(req, res, "page", "user", [{}, { limit: rows, skip: (page - 1) * rows }], function(data, count) {
        var obj = {
            data: data,
            total: count,
            success: "成功"
        };
        var str = JSON.stringify(obj);
        res.send(str);
    });
})












module.exports = router;