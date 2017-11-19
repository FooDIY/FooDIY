/**
 * Created by Sehyeon on 2017-11-15.
 */
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var randomstring = require("randomstring");

var mailer=require('../config/mailing');
require('../config/passport')(passport);


exports.home=function(req, res){
    console.log(passport);
    res.render('Home',{passport:req.session.passport});
};

exports.login=function(req, res){
    res.render('Login',{passport:req.session.passport});
};

exports.menulist=function(req, res){
    res.render('MenuList',{passport:req.session.passport});
};

exports.signup=function(req, res){
    res.render('SignUp',{passport:req.session.passport});
};

exports.logout=function (req,res,next) {
    req.logout();
    //req.session.passport='';
    //req.session.email =null;
    //req.session.seller =null;
    req.session.destroy();
    res.send('clear');
};