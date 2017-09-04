var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var moment = require('moment');
var session=require('express-session');
app.use(session({
    secret: '123456789!@#$',
    resave: false,
    saveUninitialized: true
}));

//플래시메세지를 사용한다면
var flash = require('connect-flash');
app.use(flash());

//DB 모델
var Message = require('./models/message');


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
var menu_info = require('./routes/menu');
var seller = require('./routes/seller');
var message = require('./routes/message');


app.use('/', index);
app.use('/menu_info', menu_info);
app.use('/users', users);
app.use('/seller', seller);
app.use('/message', message);


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

var http = require('http').Server(app); // 추가

/*var server = app.listen(3001, function(){
    console.log("Express server has started on port 80")
});*/

//소켓 모듈
var io = require('socket.io')(http);
http.listen('3001', function(){
    console.log("Express server listening on port " + '3001');
});

io.sockets.on('connection', function(socket) {

    socket.emit('connection', { type : 'connected' });

    socket.on('connection', function(data) {
        console.log('save');

        if(data.type === 'join')
        {
            socket.join(data.room);
            socket.room=data.room;
        }
    });

    socket.on('chat', function(data) {

        var content=data.content;
        var myname=data.myname;
        var connum=data.connum;
        var msg_to=data.msg_to;
        var newMessage=new Message;
        newMessage.content=content;
        newMessage.from=myname;
        newMessage.conver_id=connum;
        newMessage.to=msg_to;
        newMessage.checked=false;
        newMessage.time_created=moment().format();
        newMessage.save(function (err) {
            //res.send('clear');
        });
        var msg = {
            name: myname,
            content: content
        };
        socket.broadcast.to(socket.room).emit('message', msg);
    });

});

module.exports = app;
