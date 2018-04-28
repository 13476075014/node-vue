var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = require('./routes/routes');
var app = express();


//跨域  后期删
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8081"); //为了跨域保持session，所以指定地址，不能用*
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', true); //是否允许发送cookie
	next();
});

//session
var session = require('express-session');
app.use(cookieParser());
app.use(session({
	secret: 'classweb531234', //设置 session 签名
	name: 'classweb',
	cookie: {
		maxAge: 60 * 1000 * 60 * 24
	}, // 储存的时间 24小时
	resave: false, // 每次请求都重新设置session
	saveUninitialized: true
}));
















// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router(app);//路由的使用


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
