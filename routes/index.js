var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var flash = require('connect-flash');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var Member = require('../models/member');
var session=require('express-session');
app.use(session({
    secret: '123456789!@#$',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});*/

/* GET home page. */
router.get(['/'], function (req, res, next) {
    //console.log(req.user);
    console.log('Oh',req.session);
    res.render('menu_list',{session:req.session});
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
          return res.send("clear");
        });
    })(req, res, next);
});
/*
router.get('/signupnaver',function(req,res,next){
  console.log('call');
  passport.authenticate('signup_naver', function(err, user, info) {
      console.log('3');
      if (err) { return next(err); }
      if (!user) {res.send(info.error); }
      else{
          res.send("clear");
      }
  })(req, res, next);
});
*/
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
      req.session.passport='';
      req.session.temp=user.naver.id;
      var tempUser={
      id:user.naver.id,
      token:user.naver.token,
      email:user.naver.email,
      provider:'naver'
      }
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
      req.session.passport='';
      req.session.temp=user.google.id;
      var tempUser={
      id:user.google.id,
      token:user.google.token,
      email:user.google.email,
      provider:'google'
      }
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
    req.session.passport='';
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
