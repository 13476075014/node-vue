var crypto = require("crypto");
var ws = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

require("net").createServer(function(o){ //创建服务
	var key;
	o.on("data",function(e){//返回结果
		if(!key){
			//握手
			 key = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
			 console.log("key:" + key);
            key = crypto.createHash('sha1').update(key + ws).digest('base64');
            o.write('HTTP/1.1 101 Switching Protocols\r\n');
            o.write('Upgrade: websocket\r\n');
            o.write('Connection: Upgrade\r\n');
            o.write('Sec-WebSocket-Accept: ' + key + '\r\n');
            o.write('\r\n');
		}else{
			// 输出之前解析帧
            console.log(decodeDataFrame(e));
		}
		
	})
}).listen(8000);