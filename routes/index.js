var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB 모델
var Member = require('../models/member');
var Menu = require('../models/menu');

//패스포트 및 세션 유지
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

/* GET home page. */
router.get(['/'], function (req, res, next) {
    //console.log(req.user);
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
                console.log(member);
            });
        }
        if(i===menu.length) {
            console.log(x);
            console.log(y);
            res.render('menu_list', {session: req.session, menu: menu,x:x,y:y});
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
/*router.post('/signup', function (req, res, next) {
    var email=req.body.email;
    var pw=req.body.pass;
    var nick=req.body.nick;
    Member.findOne({email: email}, function(err, member){
        if(err) return res.status(500).json({error: err});
        if(member){
            return res.send("이메일이 중복됩니다.");
        }
    });
    Member.findOne({nick: nick}, function(err, membernick){
        if(err) return res.status(500).json({error: err});
        if(membernick){
            return res.send("닉네임이 중복됩니다.");
        }
    });
    var member = new Member();
    member.email = email;
    member.pw = pw;
    member.nick = nick;
    member.submit_date = new Date();
    member.save(function (err) {
        if(err) console.log("Something went wrong while saving the thing");
        else res.send("clear");
    });
});*/
router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.send(info.error); }
        else{
            req.session.user=user.email;
            req.session.seller=user.sellercheck;
            res.send("clear");
        }
    })(req, res, next);
});
/*router.post('/login', passport.authenticate('login', {
    successRedirect : '/profile',
    failureRedirect : '/', //로그인 실패시 redirect할 url주소
    failureFlash : true
}))*/

/*router.post('/login', function (req, res, next) {
    var lid = req.body.id;
    var lpw = req.body.pw;
    Member.findOne({email: lid, pw: lpw}, function(err, member){
        if(err) return res.status(500).json({error: err});
        if(!member){
            res.send('1');
        }
        else
        {
            req.session.user=1;
            res.redirect(req.get('referer'));
        }
    })
});*/

/*router.get('/logout', function (req,res,next) {
    req.logout();
    res.redirect('/');
 });*/
router.post('/logout', function (req,res,next) {
    req.session.user='';
    req.session.seller='';
    res.send('clear');
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
router.get("/menu_list",function (req,res,next) {
   res.render("menu_list");
});
router.get("/loging",function (req,res,next) {
    res.render("login_in");
});
router.get("/menu_info",function (req,res,next) {
    res.render("menu_info",{session:req.session});
});
router.get("/become1",function (req,res,next) {
    res.render("become_foodiy");
});
router.get("/become2",function (req,res,next) {
    res.render("become_foodiy2");
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