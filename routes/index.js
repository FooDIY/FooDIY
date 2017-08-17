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

//DB 모델
var Member = require('../models/member');
var Menu = require('../models/menu');


var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

/* GET home page. */
router.get(['/'], function (req, res, next) {
    var x=[];
    var y=[];
    Menu.find({},function (err, menu) {
        //이렇게 된이상 메뉴에 x,y 좌표 넣어버리자 시바 그리고 멤버 주소 바뀌면 모든 메뉴 x,y 다바꺼버려 ㅡㅡ
        for(var i=0;i<menu.length;i++)
        {
            Member.findOne({email:menu[i].member_id},function(err,member)
            {
                if(err) return res.status(500).json({error: err});
                x.push(member.address.x);
                y.push(member.address.y);
                //console.log(member);
            });
        }
        if(i===menu.length) {
            //console.log(x);
            //console.log(y);
            res.render('menu_list', {session: req.session, menu: menu,x:x,y:y});
        }
    });
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
    else(req.body.provider==='naver')
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
module.exports = router;
