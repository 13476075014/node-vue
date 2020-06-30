// 初始化protocal
var UploadReciveMessage;//定义的消息proto
var wsmessage;
var buffer; //要传给后台的数据
protobuf.load("./WrMessage.proto", function (err, root) {
  if (err) throw err;
  UploadReciveMessage = root.lookup("protobuf.UploadReciveMessage");
  wsmessage = UploadReciveMessage.create({ 
    MsgId: "1",
    MsgType:1, 
    MsgData: "hello", 
    SendWhatsId: "web",
    RecvWhatsId:"123", 
    GroupNumber:"123",
    MsgStype:1,
    MsgStime: 6 });
  buffer = UploadReciveMessage.encode(wsmessage).finish();
  init()
});

//建立websocket长连接
var wsUri = "ws://127.0.0.1:8082/";
var output;
function init() {
  output = document.getElementById("output");
  testWebSocket();
}
function testWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function (evt) {
    onOpen(evt)
  };
  websocket.onclose = function (evt) {
    onClose(evt)
  };
  websocket.onmessage = function (evt) {
    onMessage(evt)
  };
  websocket.onerror = function (evt) {
    onError(evt)
  };
}
function onOpen(evt) {
  writeToScreen("CONNECTED");
  doSend(buffer); //连接上后把上面转码的数据传给后台
}
function onClose(evt) {
  writeToScreen("DISCONNECTED");
}
function onMessage(evt) {
  var reader = new FileReader();
  reader.readAsArrayBuffer(evt.data);
  reader.onload = function (e) {
    var buf = new Uint8Array(reader.result);
    writeToScreen('<span style="color: blue;">RESPONSE: ' + UploadReciveMessage.decode(buf).MsgData + '</span>');
  }
}
function onError(evt) {
  writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}
function doSend(message) {
  writeToScreen("SENT: " + wsmessage.MsgData);
  websocket.send(buffer);
}
function writeToScreen(message) {
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}
// window.addEventListener("load", init, false);