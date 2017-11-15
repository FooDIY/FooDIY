var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
//var flash = require('connect-flash');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(flash());
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
//var Conversation = require('../models/conversation');

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

/* GET home page. */
router.get(['/'], function (req, res, next) {
    res.render('Home', {session: req.session});
});
router.get('/Login',function(req,res,next){
  res.render('Login');
});
router.get('/Submit',function(req,res,next){
  res.render('SignUp_KKY'); //자기파일에맞게수정하도록
});
router.get('/Validation',function(req,res,next){
  res.render('EmailVerification_KKY'); //자기파일에맞게수정하도록
  //URL 접근제어 필요 임시세션의발급?
});
router.get('/Temp',additionCheck,function(req,res,next){
  res.render('AdditionNaver_KKY',{naverId:req.session.additionTemp}); //자기파일에맞게수정하도록
  //URL 접근제어 필요 임시세션의발급?
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
//오직 네이버 회원가입버튼을 통한 접근만 허용
function additionCheck (req,res,next){
  if(!req.session.additionTemp){
    res.redirect('/Submit');
  }
  else{
    return next();
  }
}

router.post('/NaverSignUpTemp', function(req, res, next) {
        passport.authenticate('NaverSignUpTemp', function(err, user, info)
        {
            if (err) { return next(err); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                req.session.additionTemp=0;
                return res.send("clear");
            });
        })(req, res, next);

});
router.post('/login', function(req, res, next) {
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

router.get('/SignUpNaver', function(req, res, next) {
    passport.authenticate('SignUpNaver')(req,res,next)});
// creates an account if no account of the new user
router.get('/NaverSignUpCallback',function(req, res, next) {
        passport.authenticate('SignUpNaver', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
              req.session.additionTemp=info;
              res.redirect('/Temp');
              //콜백URL에서 URL수정없이 바로 렌더링하기때문에 새로고침시에는 오류가뜰수밖에없음 ,
              //오류처리하는방법있는지
              //현재여기서 임시세션 발급후 redirect처리해도 괜찮긴함.
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.render('MenuList');
            });
        })(req, res, next);
    }
);

router.get('/LoginNaver', function(req, res, next) {
    passport.authenticate('LoginNaver')(req,res,next)});
router.get('/NaverSignInCallback', function(req, res, next) {
    passport.authenticate('loginnaver', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render('Login',{
                messageIn:info.error});
        }
        req.logIn(user, function(err) {
            //req.session.passport='';
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
    // console.log(req.session);
});




router.get('/SignUpGoogle', function(req, res, next) {
    passport.authenticate('SignUpGoogle', { scope: ['profile', 'email'] })(req,res,next);});


router.get('/GoogleSignUpCallback', function(req, res, next) {
    passport.authenticate('SignUpGoogle', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render('MenuList');//오류메세지 추가예정
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.render('MenuList');
        });
    })(req, res, next);
    // console.log(req.session);
});

router.get('/LoginGoogle', function(req, res, next) {
    passport.authenticate('LoginGoogle', { scope: ['profile', 'email'] })(req,res,next);});

router.get('/GoogleSignInCallback', function(req, res, next) {
    passport.authenticate('LoginGoogle', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render('MenuList');
        }
        req.logIn(user, function(err) {
            //req.session.passport='';
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
    // console.log(req.session);
});

// router.post('/logout', function (req,res,next) {
//     req.logout();
//     //req.session.passport='';
//     req.session.email =null;
//     req.session.seller =null;
//     res.send('clear');
// });
// router.post('/tempout', function (req,res,next) {
//     req.session.destroy(function(err){
//     });
// });
//
// router.post("/idcheck",function (req,res,next) {
//     var lid = req.body.id;
//     Member.findOne({email: lid}, function(err, member){
//         if(err) return res.status(500).json({error: err});
//         if(!member){
//             res.send('1');
//         }
//         else
//         {
//             res.send('0');
//         }
//     })
// });
// router.post("/nickcheck",function (req,res,next) {
//     var lid = req.body.id;
//     Member.findOne({nick: lid}, function(err, member){
//         if(err) return res.status(500).json({error: err});
//         if(!member){
//             res.send('1');
//         }
//         else
//         {
//             res.send('0');
//         }
//     })
// });
// router.get("/loging",function (req,res,next) {
//     res.render("login_in");
// });
// router.get('/email-verification/:URL', function(req, res){
//     var url = req.params.URL;
//     nev.confirmTempUser(url, function(err, user){
//         console.log("confirmed user " + user);
//         if(err) console.log(err);
//         if (user) {
//             nev.sendConfirmationEmail(user.email, function(err, info) {
//                 if (err) {
//                     return res.status(404).send('ERROR: sending confirmation email FAILED');
//                 }
//                 res.send({
//                     msg: 'CONFIRMED!',
//                     info: info
//                 });
//             });
//         } else {
//             return res.status(404).send('ERROR: confirming temp user FAILED');
//         }
//     });
// });
// router.post("/msg_check",function (req,res,next) {
//   if(req.session.email)
//   {
//   Message.find({$and:[{to:req.session.email},{checked:false}]},function(err,msg){
//     if(err)
//       return res.send('error');
//     if(msg.length<=0){
//       console.log('nomessage');
//       return res.send('nomessage');
//     }
//     else {
//       console.log(msg);
//       console.log(msg.length);
//       return res.send((msg.length).toString());
//     }
//
//   });
// }
// });
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
