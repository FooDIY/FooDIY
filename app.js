var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var session=require('express-session');
app.use(session({
    secret: '123456789!@#$',
    resave: false,
    saveUninitialized: true
}));

//플래시메세지를 사용한다면
var flash = require('connect-flash');
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/FooDIY');
mongoose.Promise = global.Promise;

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지

var nev = require('email-verification')(mongoose);
require('./config/email-verification')(nev);
require('./config/passport')(passport,nev);

var index = require('./routes/index');
var users = require('./routes/users');
var manage_menu = require('./routes/manage_menu');
var seller = require('./routes/seller');


app.use('/', index);
app.use('/manage_menu', manage_menu);
app.use('/users', users);
app.use('/seller', seller);


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
var server = app.listen(80, function(){
    console.log("Express server has started on port 80")
});
module.exports = app;
