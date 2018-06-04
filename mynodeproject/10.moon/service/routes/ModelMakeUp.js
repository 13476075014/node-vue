//MakeUp表的数据库操作
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('./Model/MyMongoose').mongoose;
var handle = require('./Model/AllHandler');

/*
        brand: "",  //商品的类型
		careType:" ", //护理类型  //可选值：facialCare：面部护理类型 ； perfumeCosmetics：香水彩妆类型 ；bodyCare：身体护理类型
		img:[ ],//商品图片
		useType:" " , //用途类型，可选值：“口红” ；“化妆工具” ；“BB霜” ； “防晒霜” ；“洗面奶” ； “水” ； “乳”； ...........等
		originPrice:number , //未打折价格
		newPrice:number , //打折价格
		goodsName:" " , //商品名称
		goodsDescribe:" " ,//商品描述
		goodsDetail:" " ,//商品详情，在商品详情中的商品详情描述图片，是一个字符串类型的图片地址
		stock:number , //库存量
		monthlySales:number , //月销售量
        productionPlace:""  //产地
 */
var schema = mongoose.Schema;
var MakeUpSch = new schema({
    goodsName: String,
    goodsDescribe: String,
    goodsDetail: String,
    brand: String,
    careType: String,
    useType: String,
    originPrice: Number,
    newPrice: Number,
    productionPlace: String,
    img: Array,
    stock: Number,
    SalesCount: Number,
    monthlySales: Number
});

var MolMakeUp = mongoose.model('MakeUp', MakeUpSch, 'MakeUp');

//往表格里面插数据
router.post('/add', function(req, res) {
    var collection = [];
    collection[0] = req.body.collection;
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

//根据ID删除表格的数据
router.post("/deleteById", function(req, res) {
    var id = req.body.id;
    var collection = [];
    collection[0] = { id: ObjectId(id) };
    handle(MolMakeUp, "deleteById", collection, function(result) {
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