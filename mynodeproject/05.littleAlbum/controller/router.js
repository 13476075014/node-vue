const file = require("../models/file");

exports.showIndex = function(req,res){

    file.getAllAlbums(function(allbums){
        res.render("index",{
            "album":allbums
        })
    })
   
}


exports.showAlbum = function(req,res){
   var albumName = req.params.albumName;
    file.getAllImagesByName(albumName,function(allAlbumNames){
        res.render("album",{
            albumName:albumName,
            allAlbumNames:allAlbumNames
       })
    })
    
  
}