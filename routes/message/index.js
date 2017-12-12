var express = require('express');
var app=express();
var router = express.Router();
var controller=require('./messageController');
var bodyParser = require('body-parser');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../../config/passport')(passport);


/* GET home page. */

router.get('/:id',controller.loginCheck,controller.viewMessage);
router.get('/',controller.loginCheck,controller.viewMessageList);
// router.get('/test',function(req,res,next){
//   res.render('MessageView');
// })
/* POST home page. */
router.post('/',controller.sendMessage);  //MenuInfo의 AJAX 응답
router.post('/newCheck',controller.newCheck);

module.exports=router;
