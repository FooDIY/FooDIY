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
  console.log(req.session);
    res.render('Home');
};

exports.login=function(req, res){
    if(req.session.AlreadyErr)
    {
      var SignupError=req.session.AlreadyErr;
      req.session.AlreadyErr="";
      req.session.save(function(){
      res.render('Login',{error:SignupError});
      });
    }
    else{
    res.render('Login');
    }
};

exports.menulist=function(req, res){
    res.render('MenuList');
};

exports.signup=function(req, res){
    if(req.session.AlreadyErr){     //req.session.error.login 접근시 이미 error 객체가 존재하기에 접근거부되는건지 정확히모르겠음. 깔끔히못했음.
      var LoginError=req.session.AlreadyErr;
      req.session.AlreadyErr="";
      req.session.save(function(){
      res.render('Login',{error:LoginError});
      });
    }
    else{
    res.render('SignUp');
    }
};
