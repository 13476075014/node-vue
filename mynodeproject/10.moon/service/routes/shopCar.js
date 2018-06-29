var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('./Model/MyMongoose').mongoose;
var handle = require('./Model/AllHandler');
var formidable = require('formidable');
var fs = require('fs');

var schema = mongoose.Schema;
ShopCarSch = new schema({
    tableName: String,
    goodsID: schema.Types.ObjectId,
    buy: { type: Boolean, default: false }

})

var shopCar = mongoose.model('shopCar', ShopCarSch, 'shopCar');

//往表格里面插数据
router.post('/add', function(req, res) {
    var collection = [];
    req.body.collection.goodsID = ObjectId(req.body.collection.goodsID);
    collection[0] = req.body.collection;
    handle(shopCar, 'add', collection, function(result) {
        res.send(result)
    })
})

//查询表里所有数据
router.post("/find", function(req, res) {
    var collection = [{}];
    handle(shopCar, 'find', collection, function(result) {
        res.send(result)
    })
})

//查询表里符合条件的数据，并且筛选只要部分字段
router.post("/findSome", function(req, res) {
    var collection = [{}, {}];
    collection[0] = req.body.condition;
    collection[1] = req.body.show; //需要查询展示的字段
    handle(shopCar, 'find', collection, function(result) {
        res.send(result)
    })
})


//根据ID删除表格的数据
router.post("/deleteById", function(req, res) {
    var id = req.body.id;
    var collection = [];
    collection[0] = { id: ObjectId(id) };
    handle(shopCar, "deleteById", collection, function(result) {
        res.send(result)
    })
})

//根据ID来update更新数据
router.post("/updateById", function(req, res) {
    var id = req.body.selector._id;
    var collection = [];
    collection[0] = { id: ObjectId(id) };
    collection[1] = req.body.selector;
    handle(shopCar, "updateById", collection, function(result) {
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
    handle(shopCar, 'page', selector, function(result, count) {
        var result = { result: result, count: count }
        res.send(result);
    })

})



module.exports = router;