let express = require("express");
let WebSocket = require("ws");
let app = express();
const protobuf = require("protobufjs")
// 初始化protocal
var UploadReciveMessage;//定义的消息proto
var wsmessage;
var buffer; //要传给后台的数据
protobuf.load("./WrMessage.proto", function (err, root) {
  if (err) throw err;
  UploadReciveMessage = root.lookup("protobuf.UploadReciveMessage");
  wsmessage = UploadReciveMessage.create({ 
    MsgId: "3",
    MsgType:1, 
    MsgData: "hello", 
    SendWhatsId: "web",
    RecvWhatsId:"123", 
    GroupNumber:"123",
    MsgStype:1,
    MsgStime: 6 });
  buffer = UploadReciveMessage.encode(wsmessage).finish();
});

let wss = new WebSocket.Server({ port: 8082 });
console.log("server listening on port 8082");

wss.on("connection", function(ws, req) {
  ws.send(buffer);
  ws.on("message",function(msg,req){
    console.log("接收到消息")
    const content = UploadReciveMessage.decode(msg)
    console.log(content)
  })
  
})


app.listen(8020, function() {
  console.log("HTTP server listening on port 8030");
});
