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
        done(null, user.id);
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
                        return done(null, user);
                    });
                }
            });
        }
    ));
    // passport.use('signuptemp', new LocalStrategy({
    //         usernameField : 'email',
    //         passwordField : 'password',
    //         session: true,
    //         passReqToCallback : true
    //     },
    //     function(req, email, password, done) {
    //       console.log('efwefwe');
    //         Member.findOne({ 'google.id': profile.id }, function(err, user) {
    //             if (err)
    //             {
    //                 return done(err);
    //               }
    //             if (user)
    //             {
    //
    //                 return done(null, false, {error:'존재하는 회원입니다.'});
    //               }
    //             else
    //             {
    //                 consloe.log('not error');
    //                 Temp.findOne({'google.id':profile.id},function(err,temp){
    //                 var user = new Member();
    //                 user.firstname=req.body.firstname;
    //                 user.lastname=req.body.lastname;
    //                 user.google.id=temp.google.id;
    //                 user.google.token=temp.google.token;
    //                 temp.remove();
    //                 user.save(function(err) {
    //                   if (err)
    //                     throw err;
    //                   return done(null, user);
    //                 });
    //                 //TEMP DROP
    //                 return done(null, user);
    //               });
    //               return done(err);
    //             }
    //         });
    //     })
    // );

    passport.use('goouptemp',new LocalStrategy(
      {
              usernameField : 'email',
              passwordField : 'id',
              passReqToCallback : true
        },
  function(req,email,password, done) {
    console.log('ww');
    Member.findOne({ 'google.id': password }, function (err, member) {
      //console.log('weffff');
      if (err)
      {
          return done(err);
        }
      if (member)
      {

          return done(null, false, {error:'존재하는 회원입니다.'});
        }
      else
      {
          //console.log('not error');
          Temp.findOne({'google.id':password},function(err,temp){
          var user = new Member();
          user.firstname=req.body.firstname;
          user.lastname=req.body.lastname;
          user.google.id=temp.google.id;
          user.google.token=temp.google.token;
          //console.log(user);
          temp.remove();
          user.save(function(err) {
            if (err)
              throw err;
            return done(null, user);
          });
          //TEMP DROP
        });

      }
    });
  }
));


passport.use('navuptemp',new LocalStrategy(
  {
          usernameField : 'email',
          passwordField : 'id',
          passReqToCallback : true
    },
function(req,email,password, done) {
//console.log('ww');
Member.findOne({ 'naver.id': password }, function (err, member) {
  //console.log('weffff');
  if (err)
  {
      return done(err);
    }
  if (member)
  {

      return done(null, false, {error:'존재하는 회원입니다.'});
    }
  else
  {
      //console.log('not error');
      Temp.findOne({'naver.id':password},function(err,temp){
      var user = new Member();
      user.firstname=req.body.firstname;
      user.lastname=req.body.lastname;
      user.naver.id=temp.naver.id;
      user.naver.token=temp.naver.token;
      //console.log(user);
      temp.remove();
      user.save(function(err) {
        if (err)
          throw err;
        return done(null, user);
      });
      //TEMP DROP
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
                    return done(null, false, {error:user.email});
                if (!(user.provider==='local'))
                    return done(null, false, {error:'타사연동으로 가입된 회원입니다. 위 버튼을 이용해서 로그인해주세요'});
                return done(null, user);
            });
        })
    );

    passport.use('signupnaver',new NaverStrategy({
            clientID: 'h_2lLJKUaqh6as1FYrpL',
            clientSecret: '7_PtqJ3R4o',
            callbackURL: 'http://foodiy.net/navupCallback'
    	},
        function(accessToken, refreshToken, profile, done) {
          process.nextTick(function() {
            Member.findOne({ 'naver.id': profile.id }, function(err, member) {
              console.log('2');
              if (err)
                return done(err);   //IF temp exist ,temp serialize

              Temp.findOne({'naver.id':profile.id},function(err,temp){
                if(temp){
                  return done(null,temp);
                }
                else {
                if (member) {
                //return done(null, member);
                //USER USER EXIST
                return done(null, false, {error:'이미 존재하는 유저입니다!'})
              } else {
                var user = new Temp();
                user.naver.id = profile.id;
                user.naver.token = accessToken;
                user.naver.name = profile.displayName;
                user.naver.email = profile.emails[0].value;
                user.provider='naver';
                user.save(function(err) {
                  if (err)
                    throw err;
                  return done(null, user);
                });
              }
            }
            })

            });
          });
        }
    ));

    passport.use('loginnaver',new NaverStrategy({
        clientID: 'h_2lLJKUaqh6as1FYrpL',
        clientSecret: '7_PtqJ3R4o',
        callbackURL: 'http://foodiy.net/navinCallback'
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


    passport.use('signupgoogle',new GoogleStrategy({
        clientID: '284029061211-ebed54hk21ncv278oqod73b7hh9h2ueq.apps.googleusercontent.com',
        clientSecret: '_-uxloNCb8s8Or3RvUO8oC3o',
        callbackURL: 'http://foodiy.net/gooupCallback',
      },
        function(token, refreshToken, profile, done) {
          process.nextTick(function() {
            Member.findOne({ 'google.id': profile.id }, function(err, member) {
              console.log('2');
              if (err)
                return done(err);   //IF temp exist ,temp serialize

              Temp.findOne({'google.id':profile.id},function(err,temp){
                if(temp){
                  return done(null,temp);
                }
                else {
                if (member) {
                //return done(null, member);
                //USER USER EXIST
                return done(null, false, {error:'이미 존재하는 유저입니다!'})
              } else {
                var user = new Temp();
                user.google.id = profile.id;
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.email = profile.emails[0].value;
                user.provider='google';
                user.save(function(err) {
                  if (err)
                    throw err;
                  return done(null, user);
                });
              }
            }
            })

            });
          });
        }));

        passport.use('logingoogle',new GoogleStrategy({
            clientID: '284029061211-ebed54hk21ncv278oqod73b7hh9h2ueq.apps.googleusercontent.com',
            clientSecret: '_-uxloNCb8s8Or3RvUO8oC3o',
            callbackURL: 'http://foodiy.net/gooinCallback',
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
