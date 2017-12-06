var express = require('express');
var app=express();
var router = express.Router();
var controller=require('./messageController.js');
var bodyParser = require('body-parser');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../../config/passport')(passport);

router.get('/',function(req,res){
  res.render('MessageView_KKY',controller.messageView);
})

module.exports=router;
