/*参考网址：https://blog.csdn.net/chy555chy/article/details/52567119*/

var http = require("http");
var os = require("os");//这个是系统操作函数的模块

var server=http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':"text/html;charset=UTF-8"});
	//hostname:返回操作系统的默认临时文件夹；
	var hostn = os.hostname();    //dgfdgf-PC 
	
	//
	var loada = os.loadavg();
	
	//uptime：返回操作系统运行的时间，用秒为单位；
	var upt = os.uptime();
	
	//type:返回操作系统类型
	var type = os.type();
	
	//platform:返回操作系统类型具体到例如win32.。
	var platform = os.platform();
	
	//networkinterfaces:获得网络接口列表，包括地址、掩码、协议族、mac地址、是否是内部环回地址
	var networkinterfaces = os.networkInterfaces();
	
	//tmpdir:返回操作系统的默认临时文件夹；
	var tmpdir = os.tmpdir();
	
	//homedir:返回操作系统的家目录（库目录）；
	var homedir = os.homedir();//这里返回 C:/Users/Administrator
	
	console.log("type:" + type,"homedir:" + homedir);
	
	res.end(networkinterfaces + "");
});

server.listen(3000);
