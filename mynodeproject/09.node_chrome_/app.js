// app.js
const Koa = require('koa');
const router = require('koa-route');

const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const welcome = (ctx, name) => {
  ctx.response.body = 'Hello ' + name;
};

app.use(router.get('/', main));
app.use(router.get('/:name', welcome));

app.listen(3000);
console.log('listening on port 3000');