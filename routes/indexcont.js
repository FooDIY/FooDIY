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
    res.render('Home');
};

exports.login=function(req, res){
    res.render('Login');
};

exports.menulist=function(req, res){
    res.render('MenuList');
};

exports.signup=function(req, res){
    res.render('SignUp');
};

exports.normalsignup= function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.send(info.error); }
        else{
            res.send("clear");
        }
    })(req, res, next);
};