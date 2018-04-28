var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');

//用户在邮箱里面点击了验证后的接口
router.get('/',function(req,res,next){
	console.log(1)
	if(req.query.code && req.query.myemail && req.query.outdate){
		var code = req.query.code;
		var emailname = req.query.myemail;
		var outdate = req.query.outdate;
		outdate = Date.parse(outdate);
		if(code === "12qwe78kf" && (outdate - Date.now()) > 0){
			res.send({"success":"true"});
		}else{
			res.send({"error":"true"});
		}
	}else{
		res.send("没有传参哦！")
	}
	
});

//要发送验证邮箱的接口
router.post("/toemail",function(req,res,next){
	var euser = req.body.euser;
		var transporter = nodemailer.createTransport({
			service: 'qq',
			auth:{
				user:'*********@qq.com',  //开通了授权的自己的QQ邮箱
				pass:'****************' //这里不是密码，是通过的授权码，我这里用的QQ邮箱的授权码；
			}
		});
		
		var mailOptions = {
			'from':'1137088752@qq.com',
			'to':euser.myemail, 
			'subject':'测试邮箱验证',
			'html':`<h2>账号认证授权</h2>  
			<p>亲爱的用户: ${euser.myemail} ,<a href="http://localhost:3000/email?myemail=${euser.myemail}&code=${euser.code}&outdate=${euser.data}">请点击完成验证</a></p>`
		};
		
		transporter.sendMail(mailOptions,function(err,info){
			
			if(err){
				res.send({"error":err});
				
			}else{
				res.send({"success":"true"});
			}
		});
	
	
})



module.exports = router ;