var express = require("express");

var app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
	
	res.render("haha",{
		"news":["new1","new2","new3"]
	});
});

app.listen(3000);