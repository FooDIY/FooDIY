/**
 * Created by Sehyeon on 2017-11-15.
 */
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var randomstring = require("randomstring");
var moment = require('moment');

var Member = require('../../models/member');
var cert = require('../../models/certificate');

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
    res.render('EmailVerification',{passport:req.session.passport}); //자기파일에맞게수정하도록
    //URL 접근제어 필요 임시세션의발급?
};
exports.emailConfirm= function (req,res,next) {
    var token = req.params.id;
    cert.findOne({token: token}, function (err, member) {
        if(err){ return next(err);}
        if(!member)
        {
            res.redirect('/Login');
        }
        else
        {
            if(member.timer<moment().format())
            {
                cert.remove({email:member.email},function(err,output){
                    if(err){ return next(err);}
                });
                res.render('EmailConfirm',{safe:false,passport:req.session.passport});
            }
            else{
                cert.remove({email:member.email},function(err,output){
                    if(err){ return next(err);}
                });
                Member.findOne({email:member.email},function(err,user){
                    user.is_certificate=true;
                    user.save(function (err) {
                        if (err)
                            throw err;
                        res.render('EmailConfirm',{safe:true,passport:req.session.passport});
                    });
                })
            }
        }
    });
};
exports.loginAttemp= function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.send(info.error); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            // req.session.email=user.email;
            // req.session.seller=user.sellercheck;
            return res.send("clear");
        });
    })(req, res, next);
};
exports.reconfirm=function (req,res,next) {
    var email=req.body.email;
    Member.findOne({email:email},function (err,member) {
        cert.remove({email:email},function(err,result){
            var usercheck=new cert();
            usercheck.email=email;
            var key=randomstring.generate(10);
            var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
            cipher.update(email, 'utf8', 'hex');             // 인코딩 방식에 따라 암호화
            usercheck.token = cipher.final('hex');
            usercheck.timer=moment().add('minutes',10).format();
            usercheck.save(function (err) {
                if (err)
                    throw err;
                mailer(email,usercheck.token,member.firstname);
                res.send('clear');
            });
        })
    });
};
exports.signupGoogle=function(req, res, next) {
    passport.authenticate('SignUpGoogle', { scope: ['profile', 'email'] })(req,res,next);
};
exports.signupNaver=function(req, res, next) {
    passport.authenticate('SignUpNaver')(req,res,next)
};
exports.googleSignupCallback=function(req, res, next) {
    passport.authenticate('SignUpGoogle', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            req.session.AlreadyErr=info.error;
            req.session.save(function(err) {
              return res.redirect('/Login');
            });
        }
        else{
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
      }
    })(req, res, next);
    // console.log(req.session);
};
exports.naverSignupCallback=function(req, res, next) {
        passport.authenticate('SignUpNaver', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
              if(info.error){
                req.session.AlreadyErr=info.error;
                req.session.save(function(err) {
                return res.redirect('/Login');
              });
            }
            else{
              req.session.additionTemp=info;
              req.session.save(function(err) {
              return res.redirect('/users/NaverSignUpTemp');
              });
            }
              //콜백URL에서 URL수정없이 바로 렌더링하기때문에 새로고침시에는 오류가뜰수밖에없음 ,
              //오류처리하는방법있는지
              //현재여기서 임시세션 발급후 redirect처리해도 괜찮긴함.
            }
            // req.logIn(user, function(err) {
            //     if (err) { return next(err); }
            //     return res.redirect('/');
            // });
        })(req, res, next);
};
exports.naverSignupTemp=function(req,res,next){
  res.render('AdditionNaver',{naverId:req.session.additionTemp}); //자기파일에맞게수정하도록
  //URL 접근제어 필요 임시세션의발급?
};
exports.additionCheck=function(req,res,next){
  if(!req.session.additionTemp){
    req.session.additionTemp="";
    req.session.save(function(err) {
    return res.redirect('/SignUp');
    });
  }
  else{
    return next();
  }
};
exports.loginNaver=function(req, res, next) {
    passport.authenticate('LoginNaver')(req,res,next)
};
exports.naverSigninCallback=function(req, res, next) {
    passport.authenticate('LoginNaver', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
          req.session.AlreadyErr=info.error;
          req.session.save(function(err) {
          return res.redirect('/SignUp');
          });
        }
        else{
        req.logIn(user, function(err) {
            //req.session.passport='';
            if (err) { return next(err); }
            return res.redirect('/');
        });
      }
    })(req, res, next);
    // console.log(req.session);
};
exports.loginGoogle=function(req, res, next) {
    passport.authenticate('LoginGoogle', { scope: ['profile', 'email'] })(req,res,next);
};
exports.googleSigninCallback=function(req, res, next) {
    passport.authenticate('LoginGoogle', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
          req.session.AlreadyErr=info.error;
          req.session.save(function(err) {
            return res.redirect('/SignUp');
          });
        }
        else{
        req.logIn(user, function(err) {
            //req.session.passport='';
            if (err) { return next(err); }
            return res.redirect('/');
        });
      }
    })(req, res, next);
    // console.log(req.session);
};
exports.postSignupTemp=function(req, res, next) {
        passport.authenticate('NaverSignUpTemp', function(err, user, info)
        {
            if (err) { return next(err); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                req.session.additionTemp=0;
                req.session.save(function(err) {
                return res.send("clear");
                });
            });
        })(req, res, next);

};
exports.profile=function(req,res,next){
    Member.findOne({email:req.session.passport.user.email},function(err,user){
        res.render('Profile',{passport:req.session.passport,member:user});
    });
};