/**
 * Created by Sehyeon on 2017-11-15.
 */
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var randomstring = require("randomstring");

var mailer=require('../config/mailing');
require('../config/passport')(passport);
var Menu = require('../models/menu');

exports.home=function(req, res){
    Menu.find(function (err, menu) {
        if(err) return res.status(500).send({error: 'database failure'});
        res.render('Home',{menu:menu,passport:req.session.passport});
    });
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

exports.logout=function (req,res,next) {
    req.logout();
    //req.session.passport='';
    //req.session.email =null;
    //req.session.seller =null;
    req.session.destroy();
    res.send('clear');
};
