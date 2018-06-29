//MakeUp表的数据库操作
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('./Model/MyMongoose').mongoose;
var handle = require('./Model/AllHandler');
var formidable = require('formidable');
var fs = require('fs');

/*
        brand: "",  //商品的类型
		careType:" ", //护理类型  //可选值：facialCare：面部护理类型 ； perfumeCosmetics：香水彩妆类型 ；img:[ ],//商品图片
		useType:" " , //用途类型，可选值：“口红” ；“化妆工具” ；“BB霜” ； “防晒霜” ；“洗面奶” ； “水” ； “乳”； ...........等
		originPrice:number , //未打折价格
		newPrice:number , //打折价格
		goodsName:" " , //商品名称
		goodsDescribe:" " ,//商品描述
		goodsDetail:" " ,//商品详情，在商品详情中的商品详情描述图片，是一个字符串类型的图片地址
		stock:number , //库存量
        monthlySales:number , //月销售量
        SalesCount:number, //总销售量
        productionPlace:""  //产地
 */
var schema = mongoose.Schema;
var MakeUpSch = new schema({ //这个表的字段
    goodsName: String,
    goodsDescribe: String,
    goodsDetail: String,
    brand: String,
    careType: String,
    useType: String,
    originPrice: Number,
    newPrice: Number,
    productionPlace: String,
    img: { type: String, default: "http://localhost:3000/images/makeUp/啦.jpg" },
    stock: Number,
    SalesCount: Number,
    monthlySales: Number
});

var MolMakeUp = mongoose.model('MakeUp', MakeUpSch, 'MakeUp');

//往表格里面插数据
router.post('/add', function(req, res) {
    var collection = [];
    if (req.body.collection.img == "") {
        req.body.collection.img = "http://localhost:3000/images/makeUp/啦.jpg"
    }
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

//查询表里符合条件的数据，并且筛选只要部分字段
router.post("/findSome", function(req, res) {
    var collection = [{}, {}];
    collection[0] = req.body.condition;
    collection[1] = req.body.show; //需要查询展示的字段
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

//根据ID来update更新数据
router.post("/updateById", function(req, res) {
    var id = req.body.selector._id;
    var collection = [];
    collection[0] = { id: ObjectId(id) };
    if (req.session.makeUp_imgPath != "" && req.session.makeUp_imgPath != null) {
        req.body.selector.img = req.session.makeUp_imgPath;
        console.log(req.body.selector.img[0]);
        console.log(req.session.makeUp_imgPath);
    }
    collection[1] = req.body.selector;
    handle(MolMakeUp, "updateById", collection, function(result) {
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


//wangEditor编辑器接口
//wangeditor上传图片的地址
router.post("/wangeditor/upload", function(req, res, next) {
    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    form.uploadDir = "./public/images/makeUp";
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {
        //if(files.File){
        var oldpath = files.myFileName.path;
        var extname = files.myFileName.name;
        //新的路径由三个部分组成：时间戳、随机数、拓展名
        var newpath = "./public/images/makeUp/" + extname;
        //改名
        try {
            fs.rename(oldpath, newpath, function(err) {
                if (err) {
                    res.json({ errno: 1, data: [] });
                };
                var mypath = newpath.replace("./public", "http://localhost:3000");
                req.session.makeUp_imgPath = mypath;
                res.json({ errno: 0, data: [mypath] })
            });
        } catch (ex) {
            res.json({ errno: 1, data: null })
        }

    });
})

module.exports = router;