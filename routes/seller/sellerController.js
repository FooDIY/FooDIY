/**
 * Created by Sehyeon on 2017-11-15.
 */
var express = require('express');
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var randomstring = require("randomstring");
var bodyParser = require('body-parser');
var app = express();

require('../../config/passport')(passport);

var Member = require('../../models/member');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
exports.seller_submit= function(req, res, next) {
    res.render('Seller_Submit');
};
exports.seller_submit_post= function(req, res, next) {
    var choice_mail=req.body.choice_mail;
    var tell=req.body.tell;
    var choice_sms=req.body.choice_sms;
    var post=req.body.post;
    var add1=req.body.add1;
    var add2=req.body.add2;
    var pointx=req.body.pointx;
    var pointy=req.body.pointy;
    console.log(req.session.passport.user.email);
    Member.findOne({ email : req.session.passport.user.email }, function(err, member) {
        if (err) return res.status(500).json({error: err});
        if (!member) {
            return res.send('판매자 등록에 실패했습니다.');
        } else {
            member.mailing=choice_mail;
            member.text=choice_sms;
            member.cellphone=tell;
            member.address.post=post;
            member.address.add1=add1;
            member.address.add2=add2;
            member.address.x=pointx;
            member.address.y=pointy;
            member.sellercheck=true;
            member.save(function (err) {
                if (err)
                    throw err;
                req.session.passport.user.seller=true;
                //req.session.seller=true;
                res.send('clear');
            });
        }
    });
};
exports.juso_popup= function(req, res, next) {
    res.render('juso');
};
exports.juso_popup_post= function(req, res, next) {
    var inputYn = req.body.inputYn;
    var roadFullAddr = req.body.roadFullAddr;
    var roadAddrPart1 = req.body.roadAddrPart1;
    var roadAddrPart2 = req.body.roadAddrPart2;
    var engAddr = req.body.engAddr;
    var jibunAddr = req.body.jibunAddr;
    var zipNo = req.body.zipNo;
    var addrDetail = req.body.addrDetail;
    var admCd    = req.body.admCd;
    var rnMgtSn = req.body.rnMgtSn;
    var bdMgtSn  = req.body.bdMgtSn;
    var detBdNmList  = req.body.detBdNmList;
    var bdNm  = req.body.bdNm;
    var bdKdcd  = req.body.bdKdcd;
    var siNm  = req.body.siNm;
    var sggNm  = req.body.sggNm;
    var emdNm  = req.body.emdNm;
    var liNm  = req.body.liNm;
    var rn  = req.body.rn;
    var udrtYn  = req.body.udrtYn;
    var buldMnnm  = req.body.buldMnnm;
    var buldSlno  = req.body.buldSlno;
    var mtYn  = req.body.mtYn;
    var lnbrMnnm  = req.body.lnbrMnnm;
    var lnbrSlno  = req.body.lnbrSlno;
    var emdNo  = req.body.emdNo;
    var entX  = req.body.entX;
    var entY  = req.body.entY;
    res.render('juso',{inputYn:inputYn,roadFullAddr:roadFullAddr,roadAddrPart1:roadAddrPart1,roadAddrPart2:roadAddrPart2,engAddr:engAddr,jibunAddr:jibunAddr,zipNo:zipNo,addrDetail:addrDetail,admCd:admCd,rnMgtSn:rnMgtSn,
        bdMgtSn:bdMgtSn,detBdNmList:detBdNmList,bdNm:bdNm,bdKdcd:bdKdcd,siNm:siNm,sggNm:sggNm,emdNm:emdNm,liNm:liNm,rn:rn,udrtYn:udrtYn,buldMnnm:buldMnnm,buldSlno:buldSlno,mtYn:mtYn,lnbrMnnm:lnbrMnnm,lnbrSlno:lnbrSlno,emdNo:emdNo,entX:entX,entY:entY});
};