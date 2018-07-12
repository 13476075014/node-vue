var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var fs = require("fs");
const ModelUser = require('../models/user')

var slide = require('../public/javascripts/slide.js');

/*注册 */
router.post('/signup', function(req, res, next) { //注册用户接口
    var md5 = crypto.createHash('md5');
    var user = req.body.user;
    var password = md5.update(req.body.user.password).digest('base64');
    user.password = password;
    try {
        ModelUser.create(user).then(function(result) {
            // user = result.ops[0] //这里是获取到mongodb赋值后的user表，包含_id
            //delete user.password //删除密码这样的敏感信息
            // req.session.user = user //把别的信息存在session中
            res.send({ state: 1, msg: "成功" });
        }).catch(function(e) {
            //fs.unlink(req.files.avatar.path);
            // 用户名被占用则跳回注册页，而不是错误页
            if (e.message.match('duplicate key')) {
                res.send({ state: -2, msg: "用户名已经被占用" });
            } else {
                res.send({ state: -1, msg: e.message });
            }
        })
    } catch (ex) {
        res.send({ state: -1, msg: ex.message });
    }
});


/*登录 */
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
        } else {
            req.session.fallback = false;
            res.send(data);
        }
    });
});

router.post("/login", function(req, res, next) {
    var username = req.body.name;
    var password = req.body.password;
    // 对ajax提供的验证凭证进行二次验证
    slide.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode
    }, function(err, success) {

        if (err) {
            // 网络错误
            res.send({
                state: -1,
                msg: err
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                state: -2,
                msg: '登录失败'
            });
        } else {
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('base64');
            ModelUser.getUserByName(req.body.name).then(function(result) {
                if (result.password) {
                    if (result.password == password) {
                        req.session.user = result;
                        res.send({ state: 1, msg: "成功" })
                    } else {
                        res.send({ state: -3, msg: "用户名或密码错误" })
                    }
                } else {
                    res.send({ state: -3, msg: "用户名或密码错误" })
                }

            }).catch(function(ex) {
                res.send({ state: -4, msg: ex.message })
            })


        }
    });
})

module.exports = router;