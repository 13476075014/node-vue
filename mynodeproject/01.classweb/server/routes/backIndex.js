var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var formidable = require('formidable');
var fs = require("fs");


router.post("/add",function(req,res,next){
	if(req.body){
		handler(req, res, "backIndex", {title:req.body.title,description:req.body.description},function(data){
			if(data){
				res.send({success:"true"})
			}else{
				console.log("错误")
				res.send({success:"false"})
			}
		})
	}
	
})




/*router.post("/courseList",function(req,res,next){
	console.log("req.body++",req.body)
	 var form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = "./public/images";
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
//      	 var oldpath =files.picture.path;
//      	 var extname = files.picture.name;
        	 
        	 console.log(fields ,"+" ,files)
            //新的路径由三个部分组成：时间戳、随机数、拓展名
//           var newpath ="./public/images/" + extname;
            
        	 //改名
//          fs.rename(oldpath,newpath,function(err){
//              if(err){
//                  throw Error("改名失败");
//              }
                res.send("成功");
//          });
        	
        })
        
})*/


module.exports = router;