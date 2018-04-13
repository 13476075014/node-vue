const fs = require("fs");
const express = require("express");

const app = express();

app.get("/",function(req,res,next){
	//1.异步读取文件
	//参数1：是要读取的文件的相对地址； 参数2：是字符编码；参数3是事件结束后的回调
	//windows默认的是gbk编码，但node不支持，同意使用utf-8编码，所以在文件过大时会卡，可以使用readline模块；
	fs.readFile("./read.txt",'utf8',function(err,data){//err如果存在就是读取失败，会返回错误信息；data是成功后的读取信息
		if(err){
			res.send("错误");
		}else{
	//2.异步写文件；同步的话都是把方法写成fs.writeFileSync()这种价格sync
	//参数1：是要写入的路径；参数2是要写入的内容
			fs.writeFile("./haha.txt",data,function(err){
				if(err){
					res.send(err);
				}else{
					res.send("成功")
				}
			});
		};
		
	//3.判断文件存不存在
	//fs.stat("路径"，回调)；
			fs.stat("./haha.txt",function(err,stat){
				if(err){
					res.send(err);
				}else{
					//stat.isDirectory 看是不是文件夹 
					//stat.isFile 看是不是文件，
					//还有别的方法具体看：http://nodejs.cn/api/fs.html#fs_class_fs_stats
					
					if(stat.isFile()){
						res.send("存在")
					}
				}
			});
	
	
	//4.创建文件夹
	//fs.mkdir("路径"，回调函数)
			fs.mkdir("./111",function(){
				if(err){
					res.send(err);
				}
			});
	
	
	//5.删除文件夹
	//fs.rmdir("路径"，回调函数)
			fs.rmdir("./chunchun",function(err){
				if(err){
					res.send(err);
				}else{
					res.send("ok")
				}
				
			});
	
	//6.创建文件
	//fs.link()
			//fs.link("./111.txt","./",function(){})
	
	
	
	//7.删除文件
	//fs.unlink("路径"，回调函数)
			fs.unlink("./haha.txt",function(err){
				if(err){
					res.send(err);
				}else{
					res.send("ok")
				}
			})
	
	//8.创建文件
	//fs.createWriteStream('./out.txt')
			fs.createWriteStream('./out.txt')
	
	
	});
	
	
	
});

app.listen("3000");
