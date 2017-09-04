/**
 * Created by Sehyeon on 2017-08-06.
 */
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//동기화 모듈
var async = require('async');

//DB 모델
var Member = require('../models/member');
var Menu = require('../models/menu');
var Comment = require('../models/comment');

//패스포트 및 세션 유지
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

router.get('/:id', function (req, res, next) {
    var menunum=req.params.id;
    Menu.findOne({_id:menunum},function (err, menu) {
        if(err) console.log(err);
        if(!menu) res.redirect("/");
        Member.findOne({email:menu.member_id},function (err, member) {
            if(err) console.log(err);
            if(!member) res.redirect("/");
            Comment.find({menu_id:menunum},function (err,comment) {
                if(err) console.log(err);
                res.render('menu_info',{session:req.session,menu:menu,member:member,number:menunum,comment:comment});
            })
        })
    });
});
router.post('/comment', function (req, res, next) {
    var menu_id=req.body.menunum;
    var email=req.body.email;
    var text=req.body.text;
    var newComment=new Comment;
    newComment.menu_id=menu_id;
    newComment.email=email;
    newComment.text=text;
    newComment.save(function (err) {
        if(err) res.send('comment submit error!');
        res.send('clear');
    });
});
/*router.get('/:id', function (req, res, next) {
    async.waterfall([
        function(callback){
            var menu=menufind(req.params.id);
            callback(null,menu);
        },
        function (menu,callback) {
            callback(null,memberfind(menu));
        }
        ],
        function (err,result) {
            if(err) console.log(err);
            if(result==="Nothing") res.redirect("/");
            res.render('menu_info',{session:req.session,result:result});
        }
    );
});
function menufind(id){
    return Menu.findOne({_id:id},function (err, menu) {
        if(err) console.log(err);
        if(!menu) return ("Nothing");
        return menu;
    });
}
function memberfind(menu){
    console.log(menu.member_id);
    Member.findOne({email:menu.member_id},function (err, member) {
        if(err) console.log(err);
        if(!member) return "Nothing";
        var result=[];
        result.push(menu);
        result.push(member);
        return result;
    })
}*/

module.exports = router;
