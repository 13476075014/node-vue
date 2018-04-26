const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');

const app = new Koa();

const main = async function(ctx) {
  const tmpdir = os.tmpdir(); //得到操作系统的默认临时文件夹；
  const filePaths = []; 
  const files = ctx.request.body.files || {}; //获取到上传来的文件，图片等；

  for (let key in files) { //循环上传来的文件
    const file = files[key];
    const filePath = path.join(tmpdir, file.name); //临时的地址
    const reader = fs.createReadStream(file.path);  //读文件图片的路径
    const writer = fs.createWriteStream(filePath);  //写入一个上面临时地址，创建一个真实的地址；
    reader.pipe(writer); //把当前的可读流和另外一个可写流，连接起来，把可读流中的数据自动写入到可写流中；
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
app.use(main);
app.listen(3000);
