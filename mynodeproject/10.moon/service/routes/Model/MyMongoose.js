var mongoose = require('mongoose');
var Url = "mongodb://localhost:27017/moon"; //要用到的数据库moon;
mongoose.connect(Url);

// 监听连接成功
mongoose.connection.on('connected', function() {
    console.log("成功连接到数据库：" + Url)
})

//监听连接异常
mongoose.connection.on('error', function(err) {
    console.log("连接数据库出现异常：" + err)
})

//监听连接断开
mongoose.connection.on('disconnected', function() {
    console.log('连接数据库现在已经断开')
})


module.exports = mongoose;