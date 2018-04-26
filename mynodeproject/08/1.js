var express = require("express");
var app = express();
app.use(express.static("./dist"));


app.get('/haha',function(req,res,next){
	res.send('index');
})


app.listen(80);