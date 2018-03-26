var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var formidable = require('formidable');
var fs = require("fs");



//往表backIndex里面增加一条数据
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
	
});

//得到表backIndex的数据

router.post("/find",function(req,res,next){
	handler(req,res,"backIndex",req.body,function(result){
		if(result){
			res.send(result)
		}else{
			res.send({"error":true})
		}
	})
});



//更新数据
router.post("/update",function(req,res,next){
	if(req.body._id){
			var selectors = [
		        {"_id":ObjectId(req.body._id)},  //这里需要这样写
		        {"$set":{
		                title:req.body.title, 
		                description:req.body.description 
		            }
		        }
		    ];
			handler(req,res,"backIndex",selectors,function(result){
				if(result){
					res.send({"success":true});
				}else{
					res.send({"error":true})
				}
			});
	};
});

//新增图片
router.post("/courseList",function(req,res,next){
	 var form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = "./public/images";
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
        	 var oldpath =files.picture.path;
        	 var extname = files.picture.name;
        	 
        	 console.log(fields ,"+" ,files)
            //新的路径由三个部分组成：时间戳、随机数、拓展名
             var newpath ="./public/images/" + extname;
            
        	 //改名
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    throw Error("改名失败");
                }
                var selectors = [
					        {"_id":ObjectId(fields._id)},  //这里需要这样写
					        {"$set":{
					                img_src:"http://localhost:3000/images/" + extname
					            }
					        }
					    ];
				    
                handler(req,res,"backIndex",selectors,function(result){
						if(result){
							res.send({"success":true});
						}else{
							res.send({"error":true})
						}
					});
                
            });
        	
        });
        
})


//删除一条数据
router.post("/delete",function(req,res,next){
	if(req.body._id){
			var selectors = {"_id":ObjectId(req.body._id)};
			handler(req,res,"backIndex",selectors,function(result){
				if(result){
					res.send({"success":true});
				}else{
					res.send({"error":true})
				}
			});
	};
})



module.exports = router;