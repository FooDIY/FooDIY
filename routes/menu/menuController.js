/**
 * Created by Sehyeon on 2017-11-20.
 */
/**
 * Created by Sehyeon on 2017-11-15.
 */
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var randomstring = require("randomstring");
var moment = require('moment');

var Member = require('../../models/member');
var Menu = require('../../models/menu');
var Comment = require('../../models/comment');

require('../../config/passport')(passport);

exports.menuinfo= function(req, res, next) {
    var menunum=req.params.id;
    Menu.findOne({_id:menunum},function (err, menu) {
        if(err) console.log(err);
        if(!menu) res.redirect("/");
        Member.findOne({email:menu.member_id},function (err, member) {
            if(err) console.log(err);
            if(!member) res.redirect("/");
            Comment.find({menu_id:menunum},function (err,comment) {
                if(err) console.log(err);
                res.render('MenuInfo',{passport:req.session.passport,menu:menu,member:member,number:menunum,comment:comment});
            })
        })
    });
};
