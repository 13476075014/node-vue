//user表的数据库操作
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('./Model/MyMongoose').mongoose;
var handle = require('./Model/AllHandler');



var Schema = mongoose.Schema;
//创建schema,定义一些字段和其类型及一些限定
var SchUser = new Schema({
    pass: { type: String, require: true }, //密码
    username: { type: String, require: true }, //用户名
    phone: { type: String, require: true }, //手机
})

//建Model
var MolUser = mongoose.model('user2', SchUser);

//添加用户
router.get("/add", function(req, res, next) {
    handle(MolUser, "add", { pass: "chunchun", username: "18", phone: "1444" }, function(result) {
        console.log(result)
    });
})


module.exports = router;