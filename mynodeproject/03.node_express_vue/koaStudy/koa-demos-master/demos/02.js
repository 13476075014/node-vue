const Koa = require('koa');
const app = new Koa();


//koa提供的这个Context对象，来处理一次对话中的http请求，和http回复；
const main = (ctx,next) => {
	//ctx.response.body 就是发送给用户的内容，默认返回的类型是 text/plain
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000);
