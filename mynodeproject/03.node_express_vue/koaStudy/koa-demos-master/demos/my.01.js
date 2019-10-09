const koa = require("koa");
const app = new koa();
const path = require("path");
const server = require("koa-static");

const main = server(path.join(__dirname));

app.use(main);

app.listen(3000);

