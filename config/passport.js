/**
 * Created by Sehyeon on 2017-07-21.
 */
var LocalStrategy = require('passport-local').Strategy
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var Member = require('../models/member');
var cert = require('../models/certificate');
var passport = require('passport');
var moment = require('moment');
var mailer=require('./mailing');
var crypto = require('crypto');


module.exports = function(passport,nev) {
    passport.serializeUser(function(user, done) {
        console.log("serializeUser");
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        console.log("deserializeUser");
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            Member.findOne({ email : email }, function(err, member) {
                if (err) return done(err);
                if (member) {
                    return done(null, false, {error:'존재하는 이메일입니다.'});
                } else {
                    var user = new Member();
                    user.nick = req.body.nick;
                    user.email = email;
                    user.pw = user.generateHash(password);
                    //user.submit_date = new Date();
                    var usercheck=new cert();
                    usercheck.email=email;
                    var key="SehyeonJJang";
                    var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
                    cipher.update(email, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
                    usercheck.token = cipher.final('base64');
                    usercheck.timer=moment().add('minutes',10).format();
                    user.save(function (err) {
                        if (err)
                            throw err;
                    });
                    usercheck.save(function (err) {
                        if (err)
                            throw err;
                        mailer(email,usercheck.token);
                        return done(null, user);
                    });
                }
            });
        }
    ));
    passport.use('login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            session: true, // 세션에 저장 여부
            passReqToCallback : true
        },
        function(req, email, password, done) {
            Member.findOne({ email : email }, function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, {error:'이메일 에러'});
                if (!user.validPassword(password))
                    return done(null, false, {error:'패스워드 에러'});
                if (!user.is_certificate)
                    return done(null, false, {error:'이메일 인증 에러'});
                console.log("login");
                return done(null, user);
            });
        })
    );
};

