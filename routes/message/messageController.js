
//패스포트 및 세션 유지

//동기화 모듈
var async = require('async');

var crypto = require('crypto');
var randomstring = require("randomstring");
var moment = require('moment');

var Member = require('../../models/member');
var Menu = require('../../models/menu');
var Conversation = require('../../models/conversation');
var Message = require('../../models/message');

exports.messageView=function (req, res, next) {
    var member=req.body.member;
    if(!req.session.passport.user.email)
    {
        return res.render('unusualroute',{error:"로그인이 필요합니다."});
    }
    else if(req.session.passport.user.email==member){
        return res.send('<script type="text/javascript">alert("자기 자신에게는 메세지를 보낼 수 없습니다.");\
        if (document.referrer.indexOf("/") > 0 )\
         history.back();\
        else\
          document.location.href = "/";</script>');
          //자기 자신에게 메세지를 보내고자 할때 히스토리 back 하도록
    }
    else{
    Conversation.findOne({from:req.session.email, to:member},function (err, conver) {
        if(!conver)
        {
            var newConver=new Conversation;
            newConver.from=req.session.email;
            newConver.to=member;
            newConver.save(function (err) {
                Conversation.findOne({from:req.session.email, to:member},function (err, conver) {
                    res.redirect('/message/'+conver.id);
                });
            });
        }
        else
        {
            res.redirect('/message/'+conver.id);
        }
    })
  }
}
