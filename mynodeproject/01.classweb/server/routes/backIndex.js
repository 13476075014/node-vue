var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
var formidable = require('formidable');
var fs = require("fs");


//往表backIndex里面增加一条数据
router.post("/add", function(req, res, next) {
	if(req.body) {
		handler(req, res, "add", "backIndex", {
			title: req.body.title,
			description: req.body.description,
			scan_cout: req.body.scan_cout,
			love_cout: req.body.love_cout
		}, function(data) {
			if(data) {
				res.send({
					success: "true"
				})
			} else {
				console.log("错误")
				res.send({
					success: "false"
				})
			}
		})
	}

});


//往表backIndex里面对应的商品更新浏览量+1；
router.post("/update_scancout", function(req, res, next) {
	var selectors = [{
				"_id": ObjectId(req.body._id)
			}, //这里需要这样写
			{
				"$inc": {
					scan_cout: 1
				}
			}
		];
		
	if(req.body) {
		handler(req, res, "update", "backIndex",selectors, function(data) {
			if(data) {
				res.send({
					success: "true"
				})
			} else {
				console.log("错误")
				res.send({
					success: "false"
				})
			}
		})
	}

});

//往表backIndex里面对应的商品更新收藏量+1；
router.post("/update_lovecout", function(req, res, next) {
	var seid = req.session._id
	//判断该用户是否已经收藏过该商品
	if(req.session.loves.indexOf(req.body.goods_id) > -1 ){//已经收藏过了
		console.log("已经收藏过" + req.session.loves);
		res.send({
					love:"false",
					success: "true"
				})
	}else{//没有收藏过
		console.log(req.body.goods_id);
		var selectors = [{
				"_id": ObjectId(req.body.goods_id)
			}, //这里需要这样写
			{
				"$inc": {
					love_cout: 1
				}
			}
		];
			handler(req, res, "update", "backIndex",selectors, function(data) {
				if(data) {
					//在user表中的love_cout中加入这个id
					req.session.loves.push(req.body.goods_id);
					var selectors = [{
							"_id": ObjectId(seid)
						}, //这里需要这样写
						{
							"$push": {
								love_cout: req.body.goods_id
							}
						}
					];
					handler(req, res, "update", "user",selectors, function(data) {
						if(data) {
							res.send({
								love:"true",
								success: "true"
							})
						}else{
							console.log("数据在用户表里插入失败")
						};
					})
				} else {
					console.log("错误")
					res.send({
						love:"true",
						success: "false"
					})
				}
			});
		
	}
	

});

//得到表backIndex的数据

router.post("/find", function(req, res, next) {
	handler(req, res, "find", "backIndex", req.body, function(result) {
		if(result) {
			res.send(result)
		} else {
			res.send({
				"error": true
			})
		}
	})
});

//更新数据
router.post("/update", function(req, res, next) {
	if(req.body._id) {
		var selectors = [{
				"_id": ObjectId(req.body._id)
			}, //这里需要这样写
			{
				"$set": {
					title: req.body.title,
					description: req.body.description
				}
			}
		];
		handler(req, res, "update", "backIndex", selectors, function(result) {
			if(result) {
				res.send({
					"success": true
				});
			} else {
				res.send({
					"error": true
				})
			}
		});
	};
});

//新增图片
router.post("/courseList", function(req, res, next) {
	var form = new formidable.IncomingForm();
	//设置文件上传存放地址
	form.uploadDir = "./public/images";
	//执行里面的回调函数的时候，表单已经全部接收完毕了。
	form.parse(req, function(err, fields, files) {
		var title = fields.title;
		var description = fields.description;
		var img_src = fields.img_src;
		if(files.file){
			console.log("有")
			var oldpath = files.file.path;
			var extname = files.file.name;
			//新的路径由三个部分组成：时间戳、随机数、拓展名
			var newpath = "./public/images/" + extname;
			//改名
			fs.rename(oldpath, newpath, function(err) {
			
			if(err) {
				throw Error("改名失败");
			};

			//在往里面添加图片之前先把前面的图片删除掉

			handler(req, res, "find", "backIndex", {"_id": ObjectId(fields._id)}, function(result) {
				
				if(result) {
					console.log("result:",result)
					var img = result[0].img_src;
					//console.log("img:",img)
					if(img) {
						//把图片地址换过来，用fs的unlink模块删掉
						img = img.replace("http://localhost:3000", "./public");
						//console.log("img:",img);
						fs.unlink(img, function(err) {
								upda();
						})

					}else{
							upda()
						}

				} else {
					res.send({
						"error": true
					})
				}
			});

		});

		}else{
			var selectors = [{"_id": ObjectId(fields._id)}, //这里需要这样写
						{
							"$set": {
								title:title,
								description:description
							}
						}
					];
	
					handler(req, res, "courseList", "backIndex", selectors, function(result) {
							if(result) {
								res.send({
									"success": true
								});
							} else {
								res.send({
									"error": true
								})
							}
					});
		};
		
	
		
		//往原先的数据里面插入图片的数据
			var upda = function(){
					var selectors = [{"_id": ObjectId(fields._id)}, //这里需要这样写
						{
							"$set": {
								title:title,
								description:description,
								img_src: "http://localhost:3000/images/" + extname
							}
						}
					];
	
					handler(req, res, "courseList", "backIndex", selectors, function(result) {
						if(result) {
							res.send({
								"success": true
							});
						} else {
							res.send({
								"error": true
							})
						}
					});
			};
	
		
	});

});







//删除一条数据
router.post("/delete", function(req, res, next) {
	if(req.body._id) {
		var selectors = {
			"_id": ObjectId(req.body._id)
		};
		handler(req, res, "delete", "backIndex", selectors, function(result) {
			if(result) {
				res.send({
					"success": true
				});
			} else {
				res.send({
					"error": true
				})
			}
		});
	};
});



//分页
router.post('/page', function(req, res, next) {
    var page = req.body.page || 1;  //当前页数
    var rows = req.body.size || 5;  //一页显示的条数
    handler(req, res,"page" ,"backIndex", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
        var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
    });
});


//新增图片的接口和表单一起
router.post("/add2",function(req,res,next){
	var selectors = {};
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/images";
	form.parse(req, function(err, fields, files) {
		var title = fields.title;
		var description = fields.description;
		if(title != "" || description != ""){
			if(files.file){//有传图片
				console.log("有");
				var oldpath = files.file.path;
				var extname = files.file.name;
				var newpath = "./public/images/" + extname;
				fs.rename(oldpath, newpath, function(err) {
					if(err) {
						throw Error("改名失败");
					};
					selectors ={scan_cout:0,love_cout:0,title:title,description:description,img_src: "http://localhost:3000/images/" + extname}
					handler(req, res, "add", "backIndex", selectors, function(result) {
						if(result) {
							res.send({
								"success": true
							});
						} else {
							res.send({
								"error": true
							})
						}
					});
					
				})
				
			}else{
				selectors = {title:title,description:description,scan_cout:0,love_cout:0};
				handler(req, res, "add", "backIndex", selectors, function(result) {
						if(result) {
							res.send({
								"success": true
							});
						} else {
							res.send({
								"error": true
							})
						}
					});	
					
			};
		}
	})
})

module.exports = router;