var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');


/*这里引入极客验证的包 */
var Geetest = require('gt3-sdk');
var slide = require('./public/javascripts/slide');

var app = express();


//实现跨域
app.all('*',function(req,res,next){
	res.header('Access-Control-Allow-Origin','http://localhost:8081');
	res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers','X-Requested-With');
	res.header('Access-Control-Allow-Headers','Content-Type');
	res.header('Access-Control-Allow-Credentials',true);
	next();
})

//session，需要引用下面的包
var session = require('express-session');
app.use(session({
	secret: 'classweb531234', //设置 session 签名
	name: 'classweb',
	cookie: {
		maxAge: 60 * 1000 * 60 * 24
	}, // 储存的时间 24小时
	resave: false, // 每次请求都重新设置session
	saveUninitialized: true
}));



//极客验证
app.get("/gt/register-slide", function (req, res) {
  slide.register(null, function (err, data) {
      if (err) {
          console.error(err);
          res.status(500);
          res.send(err);
          return;
      }

      if (!data.success) {
          req.session.fallback = true;
          res.send(data);
      } else {
          req.session.fallback = false;
          res.send(data);
      }
  });
});



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


// 极客验证
app.post("/gt/validate-slide", function (req, res) {
  // 对ajax提供的验证凭证进行二次验证
  slide.validate(req.session.fallback, {
      geetest_challenge: req.body.geetest_challenge,
      geetest_validate: req.body.geetest_validate,
      geetest_seccode: req.body.geetest_seccode
  }, function (err, success) {
      if (err) {
          // 网络错误
          console.log("errererer");
          res.send({
              status: "error",
              info: err
          });

      } else if (!success) {
        console.log("susssss");
          // 二次验证失败
          res.send({
              status: "fail",
              info: '登录失败'
          });
      } else {
        console.log("eleseeeee");
          res.send({
              status: "success",
              info: '登录成功'
          });
      }
  });
});







app.use('/', index);
app.use('/users', users);










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
