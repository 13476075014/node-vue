var express = require("express");
var app = express();

app.use(express.static("./public"));  //访问静态资源的能力，这个时候就可以打开public里面的东西；



