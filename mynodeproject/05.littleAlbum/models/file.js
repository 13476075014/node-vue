var fs = require("fs");

exports.getAllAlbums = function( callback ){ //在异步里面加上一个回到函数，把最后的值通过回调函数的方式传个参数
    fs.readdir("./uploads",function(err,files){
        var allAlbums = [];
        (function iterator(i){
            if(i == files.length){
                callback(allAlbums);
                return ;
            };
            fs.stat("./uploads/" + files[i],function(err,stats){
                //stats.isFile()  如果这个目录是文件就返回true，否则返回false
                /*stats.isFile()	如果是文件返回 true，否则返回 false。
                    stats.isDirectory()	如果是目录返回 true，否则返回 false。
                    stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
                    stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
                    stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
                    stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
                    stats.isSocket()	如果是 Socket 返回 true，否则返回 false。 */
            
                 if(stats.isDirectory()){ //上面的参数会返回stats类的参数
                    allAlbums.push(files[i]); 

                 }
                iterator(i + 1)  ;
            });
            
        })(0)
    })
};


exports.getAllImagesByName = function(albumName,callback){
    fs.readdir("./uploads/" + albumName ,function(err,files){
        if(err){
            return;
        }
        var allAlbumNames = [];
        (function iterator(i){
            if(i == files.length){
                callback(allAlbumNames);
                return ;
            };
            fs.stat("./uploads/" + albumName +"/" + files[i],function(err,stats){
                //stats.isFile()  如果这个目录是文件就返回true，否则返回false
                /*stats.isFile()	如果是文件返回 true，否则返回 false。
                    stats.isDirectory()	如果是目录返回 true，否则返回 false。
                    stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
                    stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
                    stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
                    stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
                    stats.isSocket()	如果是 Socket 返回 true，否则返回 false。 */
            
                 if(stats.isFile()){ //上面的参数会返回stats类的参数
                    allAlbumNames.push(files[i]); 
                 }
                iterator(i + 1)  ;
            });
            
        })(0)
    })
}