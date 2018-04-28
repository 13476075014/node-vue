var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

//极客验证
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



/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});


/* 注册接口 */
router.post('/register',function(req,res,next){
    var md5 = crypto.createHash('md5');
    req.body.password = md5.update(req.body.password).digest('base64'); //对密码加密
    handler(req, res,"add", "user", req.body,function(data){
        if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
        }else{
            res.end('{"success":"添加成功"}');
        }
    });
})







module.exports = router;
