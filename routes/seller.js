/**
 * Created by Sehyeon on 2017-07-24.
 */
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var Member = require('../models/member');
var session=require('express-session');
app.use(session({
    secret: '123456789!@#$',
    resave: false,
    saveUninitialized: true
}));
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

/*var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
 // we're connected!
 });*/

function logincheck (req,res,next) {
    if(!req.session.user)
    {
        res.redirect('/seller');
    }
    else if(!req.session.seller)
    {
        res.redirect('/seller/submit_seller');
    }
    else
    {
        return next();
    }
}
function sellercheck (req,res,next) {
    if(!req.session.user)
    {
        res.redirect('/seller');
    }
    else
    {
        return next();
    }
}
/* GET home page. */
router.get('/', function(req, res, next) {
    /*if (req.isAuthenticated()){
     console.log("logged in");
     res.render('manage_menu');
     } else {
     res.redirect('/');
     }*/
    res.render('manage_menu');
});
router.get('/manage' ,logincheck,function(req, res, next) {
    res.render('manage_menu');
});
router.get('/submit_menu',logincheck, function(req, res, next) {
    res.render('become_foodiy2');
});
router.get('/submit_seller',sellercheck, function(req, res, next) {
    res.render('become_foodiy');
});
module.exports = router;