var express = require("express");
var app = express();
var router = require("./controller/router");

app.set("view engine","ejs");

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum);



app.use(function(req,res){
    res.render("404")
})

app.listen(3000);







