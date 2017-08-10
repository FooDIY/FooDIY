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

//패스포트 및 세션 유지
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

router.get('/:id', function (req, res, next) {
    Menu.findOne({_id:req.params.id},function (err, menu) {
        if(err) console.log(err);
        if(!menu) res.redirect("/");
        Member.findOne({email:menu.member_id},function (err, member) {
            if(err) console.log(err);
            if(!member) res.redirect("/");
            res.render('menu_info',{session:req.session,menu:menu,member:member});
        })
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