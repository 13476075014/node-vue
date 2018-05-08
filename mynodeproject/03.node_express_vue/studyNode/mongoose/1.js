/*
 * 学习网站：http://mongoosejs.com/docs/guide.html
 
 * mongoose的基本使用：
 * 		对MongoDB的使用方法的封装；在node中可以使用这个来操作MongoDB对mongo的操作；
 * 		
 * 		1.安装：
 * 			npm install mongoose
 * 		2.连接数据库：
 * 			var mongoose = require('mongoose');
 * 			mongoose.connect('mongodb://localhost/test')
 * 			var db = mongoose.connection;
 * 			db.on('error',console.error.bind(console,'connection error'));
 * 			db.once('open',function(){
 * 					//进到这个里面就已经连接上了test数据库了；
 * 				
 * 			})			
 * 
 * */