var express = require("express");
var app = express();

app.get("/haha",function(req,res){
	res.send("这是哈哈");
});

//:...
app.get("/haha/:shuzi",function(req,res){
	res.send("hahha"+req.params.shuzi);
})

app.listen(3000);