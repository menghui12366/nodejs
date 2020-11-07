var createError = require('http-errors');
var express = require('express');
var session=require('express-session');
var path = require('path');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');
var loginRouter1 = require('./routes/login1');
var registerRouter1 = require('./routes/register1');
var cookieParser=require('cookie-parser');
const { LOADIPHLPAPI } = require('dns');


var app = express();


//使用cookie
// app.use(cookieParser());

// //cookie路由守卫
// app.all('*',(req,res,next)=>{
//   console.log('进入cookie全局路由守卫');
//   console.log(req.cookies);
// if(req.cookies.islogin==='ok'||req.url==='/login1'||req.url==='/login1/in'){
//   console.log('next之前');
//   next()
// }else{
//   console.log('cookie 非法用户进入,强制进入登录');
//   res.redirect('/login')
// }
// });










//使用session
app.use(
  session({
    secret:"gfgfgf",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*10*60}
    
  })
  )

  //session路由守卫
  app.all('*',(req,res,next)=>{
    console.log('进入session全局路由守卫');
    console.log(req.session);
    if(req.session.islogin==='ok'||req.url==='/login1'||req.url==='/login1/in'){
      console.log('next之前');
      next();

    }else{
      console.log('session 非法用户进入,强制进入登录界面');
      res.redirect('/login1')
    }
  })



// view engine setup
 
app.set('views', path.join(__dirname, 'views'));
//使用模板 引擎ejs
app.set('view engine', 'ejs');
// dev的时候会处理logger日志
app.use(logger('dev'));
// 使用express的json模块 可以接收和处理现在最常用方便的JSON数据 脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的  
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 
//以下是路由表的use  必须先命中第一个路由表  才能进入后面的indexRouter 等 注意！

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pro', proRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/login1',loginRouter1)
app.use('/register1',registerRouter1)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
