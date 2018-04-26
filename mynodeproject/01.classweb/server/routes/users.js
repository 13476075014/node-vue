var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
/* POST users listing. */

var slide = require('../public/javascripts/slide.js');

router.get("/gt/register-slide", function (req, res) {

    // 向极验申请每次验证所需的challenge
    slide.register(null, function (err, data) {
        if (err) {
            console.error(err);
            res.status(500);
            res.send(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});



router.post("/login",function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	 // 对ajax提供的验证凭证进行二次验证
    slide.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode
    }, function (err, success) {

        if (err) {
            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        } else {

            /*res.send({
                status: "success",
                info: '登录成功'
            });*/
           var md5 = crypto.createHash('md5');
			  	var password = md5.update(req.body.password).digest('base64');
			    handler(req, res,"login" ,"user", {name: req.body.username},function(data){
			        if(data.length===0){
			            res.send({
			            	status:"error",
	            			info:"账号或密码错误"
			            });
			        }else if(data[0].password !== password){
			            res.send({
			            	status:"error",
	            			info:"账号或密码错误"
			            });
			        }else if(data.length!==0&&data[0].password===password){
			            req.session.username = username; //存session
			            req.session.password = password; //存密码
			            req.session._id = data[0]._id;
			            req.session.loves = data[0].love_cout; //存下收藏的产品的_id字段
			            
			             res.send({
			            	status:"success",
	            			info:"成功"
			            });
			        }
			        
			    });
        }
    });
})



//登录
/*router.post('/login', function(req, res, next) {
				var md5 = crypto.createHash('md5');
			  	var password = md5.update(req.body.password).digest('base64');
			    handler(req, res,"login" ,"user", {name: req.body.username},function(data){
			        if(data.length===0){
			            res.send({
			            	status:"error",
	            			info:"账号或密码错误"
			            });
			        }else if(data[0].password !== password){
			            res.send({
			            	status:"error",
	            			info:"账号或密码错误"
			            });
			        }else if(data.length!==0&&data[0].password===password){
			            req.session.username = "liuchunchun"; //存session
			            req.session.password = password;
			             res.send({
			            	status:"success",
	            			info:"成功"
			            });
			        }
			        
			    });
});*/

//退出
router.post('/logout', function(req, res, next) {
    req.session.username = ""; //清除session中的用户信息
    req.session.password = "";
    req.session.loves = [];
    res.end('{"success":"true"}');
});


//管理员列表
router.post('/AdminList', function(req, res, next) {
    //console.log(req.body);
    //req.route.path = "/page"; //修改path来设定 对 数据库的操作
    var page = req.body.page || 1;  //当前页数
    var rows = req.body.rows || 5;  //一页显示的条数
    handler(req, res,"page" ,"user", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
        var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
    });
});


//添加管理员
router.post('/add', function(req, res, next) {
    //console.log(req.body);
    var md5 = crypto.createHash('md5');
    req.body.password = md5.update(req.body.password).digest('base64');
    handler(req, res,"add", "user", req.body,function(data){
        
        //console.log(data);
        if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
        }else{
            res.end('{"success":"添加成功"}');
        }
    });
});


//删除用户
router.post('/delete', function(req, res, next) {
    handler(req, res,"delete" ,"user", {"_id" : ObjectId(req.body._id)},function(data){
        if(data.length==0){
            res.end('{"err":"抱歉，删除失败"}');
        }else{
            var obj = {
              success:"删除成功"
            };
            var str = JSON.stringify(obj);
            res.end(str);
        }
        
    });
});


//编辑更新用户
router.post('/update', function(req, res, next) {
    var selectors = [
        {"_id":ObjectId(req.body._id)},
        {"$set":{
                name:req.body.name, //用户名称
                phone:req.body.phone //联系电话
            }
        }
    ];
    if(req.body.password){
    	var md5 = crypto.createHash('md5');
    	var pa = md5.update(req.body.password).digest('base64');
    	selectors[1].$set.password = pa;
    };
    console.log(selectors);
    handler(req, res,"update" ,"user", selectors,function(data){
        if(data.length==0){
            res.end('{"err":"抱歉，修改失败"}');
        }else{
            res.end('{"success":"修改成功"}');
        }
        
    });
    
});



module.exports = router;