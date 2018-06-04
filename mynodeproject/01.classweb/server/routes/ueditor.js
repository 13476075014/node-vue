var ueditor = require('ueditor');
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require("fs");
var context = require('../public/javascripts/context');

router.get('/ue',function(req,res,next){
	 //客户端上传文件设置
    var imgDir = '/ueditor/imgages/'  //上传的图片保存的位置；
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/ueditor'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/ueditor'; //视频
        }
        console.log("tupian")
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.send("haha")
        //res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        console.log("gangjinlai")
        //res.setHeader('Content-Type', 'application/json');
        //res.redirect('/ueditor/nodejs/config.json');
        res.json("/ueditor/nodejs/config.json")
    }
})



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
