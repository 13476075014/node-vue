var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require("fs");
var context = require('../public/javascripts/context');

//wangeditor上传图片的地址
router.post("/wangeditor/upload",function(req,res,next){
	var form = new formidable.IncomingForm();
	//设置文件上传存放地址
	form.uploadDir = "./public/images/wang";
	//执行里面的回调函数的时候，表单已经全部接收完毕了。
	form.parse(req, function(err, fields, files) {
		//if(files.File){
			var oldpath = files.myFileName.path;
			var extname = files.myFileName.name;
			//新的路径由三个部分组成：时间戳、随机数、拓展名
			var newpath = "./public/images/wang/" + extname;
			//改名
			fs.rename(oldpath, newpath, function(err) {
				if(err) {
					res.send({errno:1,data:[]});
				};
				var mypath = newpath.replace("./public","http://" + context.ip +":3000");
				res.send({errno:0,data:[mypath]})
			});
	});
})



module.exports = router;
