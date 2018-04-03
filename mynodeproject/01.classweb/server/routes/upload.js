var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var formidable = require('formidable');
var fs = require("fs");


router.post("/",function(req,res,next){
	var form = new formidable.IncomingForm();
	//设置文件上传存放地址
	//form.uploadDir = "./public/images";
	//执行里面的回调函数的时候，表单已经全部接收完毕了。
	form.parse(req, function(err, fields, files) {
		console.log("files:",files)
		console.log("fields:",fields)
		
	})
})


module.exports = router;











