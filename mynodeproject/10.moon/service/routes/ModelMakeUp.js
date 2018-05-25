//MakeUp表的数据库操作
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('./Model/MyMongoose').mongoose;
var handle = require('./Model/AllHandler');

var schema = mongoose.Schema;
var MakeUpSch = new schema({
    brand: String,
    facialCare: String,
    perfumeCosmetics: String,
    bodyCare: String,
    productionPlace: String,
    img: String,
    price: String
});

var MolMakeUp = mongoose.model('MakeUp', MakeUpSch, 'MakeUp');

//往表格里面插数据
router.post('/add', function(req, res) {
    var collection = [{
        brand: "ysl",
        facialCare: "套装",
        perfumeCosmetics: "",
        bodyCare: "",
        productionPlace: "北京"
    }];
    handle(MolMakeUp, 'add', collection, function(result) {
        res.send(result)
    })
})

//查询表里所有数据
router.post("/find", function(req, res) {
    var collection = [{}];
    handle(MolMakeUp, 'find', collection, function(result) {
        res.send(result)
    })
})

//分页查询
router.post('/page', function(req, res) {
    var selector = [];
    selector[0] = {};
    selector[1] = {
        pageSize: req.body.rows, //每页展示几条数据
        currentPage: req.body.page //当前在第几页
    };
    //res.send("111")
    handle(MolMakeUp, 'page', selector, function(result, count) {
        var result = { result: result, count: count }
        res.send(result);
    })

})


module.exports = router;