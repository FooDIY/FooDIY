var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var flash = require('connect-flash');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(flash());
var async = require('async');
var crypto = require('crypto');
var moment = require('moment');
var mailer=require('../config/mailing');
var randomstring = require("randomstring");

//DB 모델
var Member = require('../models/member');
var Menu = require('../models/menu');
var cert = require('../models/certificate');
var Message = require('../models/message')
var Conversation = require('../models/conversation');

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

/* GET home page. */
router.get(['/'], function (req, res, next) {
    res.render('menu_list', {session: req.session});
});
router.post('/map_change', function (req, res, next) {
    var smallx=req.body.smallx;
    var smally=req.body.smally;
    var bigx=req.body.bigx;
    var bigy=req.body.bigy;
    Menu.where('address.x').gte(smallx).lte(bigx).where('address.y').gte(smally).lte(bigy).exec(function (err, menu) {
        if(err) res.send(json(500));
        if(menu) {
            res.send(menu);
        }
        else {
            res.send("nothing");
        }
    });
});
router.get('/test', function (req, res, next) {
    res.render('sign_up');
});
router.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.send(info.error); }
        else{
            res.send("clear");
        }
    })(req, res, next);
});
router.post('/signuptemp', function(req, res, next) {
    if(req.body.provider==='google')
    {
        passport.authenticate('goouptemp', function(err, user, info)
        {
            if (err) { return next(err); }
            if (!user) {
                res.send(info.error);
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                req.session.email=user.email;
                req.session.seller=user.sellercheck;
                return res.send("clear");
            });
        })(req, res, next);
    }
    else if(req.body.provider==='naver')
    {
        passport.authenticate('navuptemp', function(err, user, info)
        {
            if (err) { return next(err); }
            if (!user) {
                res.send(info.error);
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                req.session.email=user.email;
                req.session.seller=user.sellercheck;
                return res.send("clear");
            });
        })(req, res, next);
    }
});
router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.send(info.error); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            req.session.email=user.email;
            req.session.seller=user.sellercheck;
            return res.send("clear");
        });
    })(req, res, next);
});
router.post('/reconfirm', function (req,res,next) {
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
});
router.get('/signupnaver', function(req, res, next) {
    passport.authenticate('signupnaver')(req,res,next)});
// creates an account if no account of the new user
router.get('/navupCallback',function(req, res, next) {
        passport.authenticate('signupnaver', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.render('menu_list',{
                    session:req.session,
                    messageUp:info.error});
            }

            req.logIn(user, function(err) {
                //req.session.passport='';
                req.session.temp=user.naver.id;
                var tempUser={
                    id:user.naver.id,
                    token:user.naver.token,
                    email:user.naver.email,
                    provider:'naver'
                };
                if (err) { return next(err); }
                return res.render('menu_list',{
                    session:req.session,
                    users:tempUser});
            });
        })(req, res, next);
    }
);


router.get('/loginnaver', function(req, res, next) {
    passport.authenticate('loginnaver')(req,res,next)});

router.get('/navinCallback', function(req, res, next) {
    passport.authenticate('loginnaver', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render('menu_list',{
                session:req.session,
                messageIn:info.error});
        }
        req.logIn(user, function(err) {
            //req.session.passport='';
            if (err) { return next(err); }
            req.session.email=user.email;
            req.session.seller=user.sellercheck;
            return res.redirect('/');
        });
    })(req, res, next);
    // console.log(req.session);
});


router.get('/signupgoogle', function(req, res, next) {
    passport.authenticate('signupgoogle', { scope: ['profile', 'email'] })(req,res,next);});


router.get('/gooupCallback', function(req, res, next) {
    passport.authenticate('signupgoogle', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render('menu_list',{
                session:req.session,
                messageUp:info.error});
        }

        req.logIn(user, function(err) {
            //req.session.passport='';
            req.session.temp=user.google.id;
            var tempUser={
                id:user.google.id,
                token:user.google.token,
                email:user.google.email,
                provider:'google'
            };
            if (err) { return next(err); }
            return res.render('menu_list',{
                session:req.session,
                users:tempUser});
        });
    })(req, res, next);
    // console.log(req.session);
});

router.get('/logingoogle', function(req, res, next) {
    passport.authenticate('logingoogle', { scope: ['profile', 'email'] })(req,res,next);});

router.get('/gooinCallback', function(req, res, next) {
    passport.authenticate('logingoogle', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render('menu_list',{
                session:req.session,
                messageIn:info.error});
        }
        req.logIn(user, function(err) {
            //req.session.passport='';
            if (err) { return next(err); }
            req.session.email=user.email;
            req.session.seller=user.sellercheck;
            return res.redirect('/');
        });
    })(req, res, next);
    // console.log(req.session);
});

router.post('/logout', function (req,res,next) {
    req.logout();
    //req.session.passport='';
    req.session.email =null;
    req.session.seller =null;
    res.send('clear');
});
router.post('/tempout', function (req,res,next) {
    req.session.destroy(function(err){
    });
});

router.post("/idcheck",function (req,res,next) {
    var lid = req.body.id;
    Member.findOne({email: lid}, function(err, member){
        if(err) return res.status(500).json({error: err});
        if(!member){
            res.send('1');
        }
        else
        {
            res.send('0');
        }
    })
});
router.post("/nickcheck",function (req,res,next) {
    var lid = req.body.id;
    Member.findOne({nick: lid}, function(err, member){
        if(err) return res.status(500).json({error: err});
        if(!member){
            res.send('1');
        }
        else
        {
            res.send('0');
        }
    })
});
router.get("/loging",function (req,res,next) {
    res.render("login_in");
});
router.get('/email-verification/:URL', function(req, res){
    var url = req.params.URL;
    nev.confirmTempUser(url, function(err, user){
        console.log("confirmed user " + user);
        if(err) console.log(err);
        if (user) {
            nev.sendConfirmationEmail(user.email, function(err, info) {
                if (err) {
                    return res.status(404).send('ERROR: sending confirmation email FAILED');
                }
                res.send({
                    msg: 'CONFIRMED!',
                    info: info
                });
            });
        } else {
            return res.status(404).send('ERROR: confirming temp user FAILED');
        }
    });
});
router.post("/msg_check",function (req,res,next) {
  if(req.session.email)
  {
  Message.find({$and:[{to:req.session.email},{checked:false}]},function(err,msg){
    if(err)
      return res.send('error');
    if(msg.length<=0){
      console.log('nomessage');
      return res.send('nomessage');
    }
    else {
      console.log(msg);
      console.log(msg.length);
      return res.send((msg.length).toString());
    }

  });
}
});
// router.post("/msg_check",function (req,res,next) {
//   var i=0;
//   var sum=0;
//   var j;
//   var membermail;
//   Conversation.find({to:req.session.email},function(err,msg){
//     console.log(msg);
//     msg_Count(msg,i,sum,function(count){
//       console.log(count);
//       n=count.toString();
//       res.send(n);
//     });
//   });
// });
// function msg_Count(msg,i,count,callback){
//   if(i<msg.length) {
//     Message.find({checked:false}).exec(function (err, results) {
//       if(!results)
//       {
//         i++;
//         msg_Count(msg,i,count,callback);
//       }
//       else {
//         count=results.length;
//         i++
//         msg_Count(msg,i,count,callback);
//       }
//
//     });
//   }
//   else {
//     callback(count);
//   }
// }

module.exports = router;
