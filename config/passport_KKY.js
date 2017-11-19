/**
 * Created by Sehyeon on 2017-07-21.
 */
var LocalStrategy = require('passport-local').Strategy;
var NaverStrategy = require('passport-naver').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var Member = require('../models/member');
var Temp = require('../models/temp');
var cert = require('../models/certificate');
var passport = require('passport');
var moment = require('moment');
var mailer=require('./mailing');
var crypto = require('crypto');
var randomstring = require("randomstring");

module.exports = function(passport,nev) {
    passport.serializeUser(function(user, done) {
        done(null, {email:user.email,seller:user.sellercheck});
    });
    passport.deserializeUser(function(id, done) {

        Member.findById(id, function(err, user) {
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
                    //user.nick = req.body.nick;
                    user.firstname=req.body.firstname;
                    user.lastname=req.body.lastname;
                    user.email = email;
                    user.provider='local';
                    user.pw = user.generateHash(password);
                    //user.submit_date = new Date();
                    var usercheck=new cert();
                    usercheck.email=email;
                    var key=randomstring.generate(10);
                    var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
                    cipher.update(email, 'utf8', 'hex');             // 인코딩 방식에 따라 암호화
                    usercheck.token = cipher.final('hex');
                    usercheck.timer=moment().add('minutes',10).format();
                    user.save(function (err) {
                        if (err)
                            throw err;
                    });
                    usercheck.save(function (err) {
                        if (err)
                            throw err;
                        mailer(email,usercheck.token,req.body.firstname);
                        return done(null, false, {error:'clear'});
                        // return done(null, user);
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
                if (!(user.provider==='local'))
                    return done(null, false, {error:'타사연동으로 가입된 회원입니다. 위 버튼을 이용해서 로그인해주세요'});
                if (!user.validPassword(password))
                    return done(null, false, {error:'패스워드 에러'});
                if (!user.is_certificate)
                    return done(null, false, {error:user.email});
                return done(null, user);
            });
        })
    );

    passport.use('SignUpNaver',new NaverStrategy({
            clientID: 'h_2lLJKUaqh6as1FYrpL',
            clientSecret: '7_PtqJ3R4o',
            callbackURL: 'http://foodiy.net/NaverSignUpCallback'
    	},
        function(accessToken, refreshToken, profile, done) {
          process.nextTick(function() {
            Member.findOne({ 'naver.id': profile.id }, function(err, user) {
              if (err)
                return done(err);   //IF temp exist ,temp serialize
              if(user){
                if(user.naver.validation){
                  return done(null, false,{error:'이미 존재하는 유저입니다!'});  //이미 추가정보 입력까지 마친회원
                }
                else{
                  return done(null, false,user.naver.id);   //아직 추가정보를 입력하지 않은 회원
                }
              }
              else{
                var user=new Member();
                console.log(profile.id);
                user.naver.id=profile.id;
                user.naver.name=profile.displayName;
                user.email=profile.emails[0].value;
                user.provider='naver';
                //네이버가 제공하는 이메일의 신뢰성은 잘모르겠음.
                //그런데 얘네가 제공하는 이메일말고 이메일에 접근할방법없음
                user.save(function(err){
                  if(err)
                    throw err;
                  return done(null,false,user.naver.id);    //처음접근인경우
                });

              }

            });
          });
        }
    ));
    passport.use('NaverSignUpTemp',new LocalStrategy(
      function(username, password, done) {
        Member.findOne({ 'naver.id' : req.body.id }, function(err, member) {
            if (err) return done(err);
                member.firstname=req.body.firstName;
                member.lastName=req.body.lastName;
                member.naver.validation=1;
                user.save(function(err){
                  if(err)
                    throw err;
                  return done(null,member);    //처음접근인경우
                });
        });

      }
    ));
    passport.use('LoginNaver',new NaverStrategy({
        clientID: 'h_2lLJKUaqh6as1FYrpL',
        clientSecret: '7_PtqJ3R4o',
        callbackURL: 'http://foodiy.net/NaverSignInCallback'
      },
        function(token, refreshToken, profile, done) {
          process.nextTick(function() {
            Member.findOne({ 'naver.id': profile.id }, function(err, member) {
              if (err)
                return done(err);   //IF temp exist ,temp serialize
              if (!member) {
                return done(null, false, {error:'회원가입이 필요합니다!'})
              }
              else {

                  return done(null, member);
              }
            });
          });
        }));


    passport.use('SignUpGoogle',new GoogleStrategy({
        clientID: '284029061211-ebed54hk21ncv278oqod73b7hh9h2ueq.apps.googleusercontent.com',
        clientSecret: '_-uxloNCb8s8Or3RvUO8oC3o',
        callbackURL: 'http://foodiy.net/GoogleSignUpCallback',
      },
        function(token, refreshToken, profile, done) {
          process.nextTick(function() {
            Member.findOne({ 'google.id': profile.id }, function(err, member) {
                if (err)
                  return done(err);   //IF temp exist ,temp serialize
                else {
                    if (member) {
                    //return done(null, member);
                    //USER USER EXIST
                    return done(null, false, {error:'이미 존재하는 유저입니다!'});
                  } else {
                    var user = new Member();
                    user.google.id = profile.id;
                    user.firstname = profile.name.familyName;
                    user.lastname = profile.name.givenName;
                    user.email = profile.emails[0].value;
                    user.provider='google';
                    user.save(function(err) {
                      if (err)
                        throw err;
                      return done(null, user);
                    });
                  }
            }

            });
          });
        }));

        passport.use('LoginGoogle',new GoogleStrategy({
            clientID: '284029061211-ebed54hk21ncv278oqod73b7hh9h2ueq.apps.googleusercontent.com',
            clientSecret: '_-uxloNCb8s8Or3RvUO8oC3o',
            callbackURL: 'http://foodiy.net/GoogleSignInCallback',
          },
            function(token, refreshToken, profile, done) {
              process.nextTick(function() {
                Member.findOne({ 'google.id': profile.id }, function(err, member) {
                  if (err)
                    return done(err);   //IF temp exist ,temp serialize
                  if (!member) {
                    return done(null, false, {error:'회원가입이 필요합니다!'})
                  }
                  else {
                      return done(null, member);
                  }
                });
              });
            }));

};
