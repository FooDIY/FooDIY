/**
 * Created by Sehyeon on 2017-11-15.
 */
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var randomstring = require("randomstring");

require('../../config/passport')(passport);
exports.normalsignup= function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.send(info.error); }
        else{
            res.send("clear");
        }
    })(req, res, next);
};
exports.emailValidation= function(req,res,next){
    res.render('EmailVerification'); //자기파일에맞게수정하도록
    //URL 접근제어 필요 임시세션의발급?
};