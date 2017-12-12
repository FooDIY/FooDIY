
//패스포트 및 세션 유지

//동기화 모듈
var express = require('express');
var app = express();

var async = require('async');

var crypto = require('crypto');
var randomstring = require("randomstring");
var moment = require('moment');
var Member = require('../../models/member');
var Menu = require('../../models/menu');
var Conversation = require('../../models/conversation');
var Message = require('../../models/message');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

moment.updateLocale('ko', {
    relativeTime : {
        future: "in %s",
        past:   "%s 전",
        s  : '몇 초',
        ss : '%d 초',
        m:  "몇 분",
        mm: "%d 분",
        h:  "한 시간",
        hh: "%d 시간",
        d:  "하루",
        dd: "%d 일",
        M:  "한 달",
        MM: "%d 달",
        y:  "일 년",
        yy: "%d 년"
    }
});
//몇달전,몇초전,moment.from을위한 한국어 설정


//MenuInfo.js와 ajax통신용 controller
exports.sendMessage=function (req, res, next) {
    var member=req.body.email;  //member 변수는 MenuInfo.pug페이지에 렌더링된 메뉴등록자의 이메일주소임.
    if(!req.session.passport)   //사용자가 로그인 안되어있을때,
    {
        return res.send("1");
    }
    else if(req.session.passport.user.email==member){ //자기자신에게 메세지를 보내고자 할 때
        return res.send("2");
    }
    else{
    Conversation.findOne({from:req.session.passport.user.email, to:member},function (err, conver) {
        if(!conver)//메세지가 존재하지않을경우 메세지를 만들어준 뒤 ,db저장후 리다이렉트
        {
            var newConver=new Conversation;
            newConver.from=req.session.passport.user.email;
            newConver.to=member;
            newConver.save(function (err) {
                  Conversation.findOne({from:req.session.passport.user.email, to:member},function (err, conver) {
                  res.send(conver._id);
                });
            });
        }
        else//메세지 존재시 바로 리다이렉트
        {
            res.send(conver._id);
        }
    })
  }
}
exports.viewMessage=function (req, res, next) {
    var connum=req.params.id;
    var memberemail;
    var i=0;
    if(!req.session.passport)
    {
        return res.render('unusualroute',{error:"로그인이 필요합니다."});
    }
    if(!connum) //애초에 쿼리스트링으로 왔는데 쿼리스트링이 존재하지않는경우는 없지않는지.
    {
        return res.render('unusualroute',{error:"잘못된 경로입니다."});
    }
    Conversation.findOne({_id:connum},function (err, conver) {
        if(!conver)
        {
            return res.render('unusualroute',{error:"잘못된 경로입니다."});
        }
        //내가 아닌 상대방의 객체에 접근하기 위한 조건문.
        if (conver.to === req.session.passport.user.email) {
            memberemail = conver.from;
            i = 1;
        }
        else if(conver.from===req.session.passport.user.email){
            memberemail = conver.to;
            i = 1;
        }
        else {
          return res.render('unusualroute',{error:"잘못된 경로입니다."});
        }
        if (i === 1)
        {
            Member.findOne({email:memberemail},function(err,member) {
                Message.find({conver_id: connum},function(err,message){
                //나에게 온 메세지중에서 체크가안된 거를 체크해준다, 효율은??
                    for(var i=0;i<message.length;i++){
                      message[i].fromNow=moment(message[i].time_created).fromNow(); //언제메세지왔는지 상대적날짜체크
                        if((message[i].to===req.session.passport.user.email)&&(!message[i].checked)){
                            message[i].checked=true;
                            message[i].save(function(err){
                                if(err)
                                    return res.send('error');
                            });
                        }
                    };

                    //내 썸네일도 보내줘야함.

                    //현재 메세지 전부 보내줄필요없음, 여기에서 썸네일 이미지 객체로 묶어서 보내주는것도 괜찮을듯.
                    res.render('MessageView', {passport: req.session.passport, member: member, message: message, connum: connum});
                });
                // Message.find({conver_id: connum}, {
                //         /*skip:0, // Starting Row
                //          limit:10, // Ending Row
                //          sort:{
                //          time_created: -1 //Sort by Date Added DESC
                //          }*/
                //     },
                //     function (err, message) {
                //         //console.log(message);
                //         res.render("message", {session: req.session, member: member, message: message, connum: connum});
                //     });
            });
        }
    });
}


exports.viewMessageList=function(req,res,next){
  //user.sellerchec
  //로그인안되어있을때 처리 필요
  Conversation.find({$or:[{to:req.session.passport.user.email},{from:req.session.passport.user.email}]},function (err, conver) {
    var temp_arr=new Array();
    var i=0;
    //나에대한 모든 대화를 긁어온다음에 내가 판매자로써보낸건지 구매자로써보낸건지 체크함.
    make_Marray(req.session.passport.user.email,conver,i,temp_arr,function(temp_arr){
        res.render('Message',{conver:temp_arr,passport:req.session.passport});
    });
  });
  // res.render('Message',{passport:req.session.passport})
}

//대화검색
//찾은 대화 기반으로 make_Marray 이용해서 가장 최근에 온 메세지를 찾음.
//콜백때문에 재귀적으로 구현했고 대화별로 최근에 도착한 메세지 객체 구열하고 배열에 푸시한뒤에
//정렬한 뒤에 전달해줌. (가장 최근 대화가 이뤄진 대화가 가장 맨위에 위치할수있도록)
//비효율적임,그러나 디비무결성때문에 고민하는중 토의필요

function make_Marray(email,conver,i,temp_arr,callback){
  if(i<conver.length)
  {
    Message.find({conver_id:conver[i]._id}).sort('-time_created').exec(function(err,msg){
    // Message.findOne({conver_id:conver[i]._id}).sort('-time_created').exec(function(err,msg){
      if(!msg)
      {
        i++;
        make_Marray(email,conver,i,temp_arr,callback);
      }
      else{
        var unchecked=0;
        for(var j=0;j<msg.length;j++){
          if(msg[j].checked===false){
            unchecked++;
          }
        }
        if(email===conver[i].from){
          Member.findOne({email:conver[i].to},function(err,member){
            var temp={
              id:conver[i]._id,
              to:conver[i].to,
              from:conver[i].from,
              top_message:msg[0].content,
              msg_priority:msg[0].time_created,
              fromNow:moment(msg[0].time_created).fromNow(),
              name:member.seller.shopName,
              flag:1,
              unchecked:unchecked
          };
          temp_arr.push(temp);
          i++
          make_Marray(email,conver,i,temp_arr,callback);
          });
        }
        else{
          Member.findOne({email:conver[i].from},function(err,member){
            var temp={
              id:conver[i]._id,
              to:conver[i].to,
              from:conver[i].from,
              top_message:msg[0].content,
              msg_priority:msg[0].time_created,
              fromNow:moment(msg[0].time_created).fromNow(),
              name:member.lastname+member.firstname,
              flag:0,
              unchecked:unchecked
          };
          temp_arr.push(temp);
          i++
          make_Marray(email,conver,i,temp_arr,callback);
          });
        }
        //반드시 고쳐야함.


    }
    });
  }
  else {
    temp_arr.sort(function(a,b){
      return a.msg_priority>b.msg_priority?-1:a.msg_priority<b.msg_priority?1:0;
    });
    callback(temp_arr);
  }
}
exports.loginCheck=function(req,res,next){
  if(req.session.passport){
    return next();
  }
  else{
    res.redirect('/Login');
  }
};
//component/TopMenu_KKY.js와 통신

exports.newCheck=function(req,res,next){
  if(!req.session.passport){
    //ajax콜에서 아무 응답도 안하고싶을떄는 어떤값을 리턴시켜줘야하는지?
    return res.send("clear");
  }
  else{
    Message.find({to:req.session.passport.user.email},function(err,message){
      if(!message){
        return res.send("clear");
      }
      else{
        //나에게 온메세지중에서 읽지않은 메세지의 수를 체크하고 ajax통신 리턴값으로 넘겨줌
        var numMessage=0;
        for(var i=0;i<message.length;i++){
          if(message[i].checked===false){
            numMessage++;
          }
        }
        //ajax에서 int값 반환할때 그냥 파스해서보내는게좋은지
        //그냥 json으로보내는게좋은지
        //int값 반환하려고 json형식으로보냈음
        return res.send({message:numMessage});
      }
    });
  }
};
