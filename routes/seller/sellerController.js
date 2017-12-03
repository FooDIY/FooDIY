/**
 * Created by Sehyeon on 2017-11-15.
 */
var express = require('express');
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
var randomstring = require("randomstring");
var bodyParser = require('body-parser');
var moment = require('moment');
var multer=require('multer');

var app = express();

require('../../config/passport')(passport);

var Member = require('../../models/member');
var Menu = require('../../models/menu');
var Table = require('../../models/table');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Menu_storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/img/'+file.fieldname);
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"!"+file.originalname);
    }
});
var uploadMenu=multer({storage:Menu_storage});
var fs = require('fs');

exports.seller_main= function(req, res, next) {
    Member.findOne({ email : req.session.passport.user.email }, function(err, member) {
        Menu.find({member_id:req.session.passport.user.email},function (err, menu) {
            res.render('MenuManagement',{member:member,menu:menu,passport:req.session.passport});
        });
    });
};

exports.seller_submit= function(req, res, next) {
    res.render('Seller_Submit',{passport:req.session.passport});
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
        bdMgtSn:bdMgtSn,detBdNmList:detBdNmList,bdNm:bdNm,bdKdcd:bdKdcd,siNm:siNm,sggNm:sggNm,emdNm:emdNm,liNm:liNm,rn:rn,udrtYn:udrtYn,buldMnnm:buldMnnm,buldSlno:buldSlno,mtYn:mtYn,lnbrMnnm:lnbrMnnm,lnbrSlno:lnbrSlno,emdNo:emdNo,entX:entX,entY:entY,passport:req.session.passport});
};
exports.submit_menu= function(req, res, next) {
    res.render('MenuSubmit',{passport:req.session.passport});
};
exports.uploadMenu= function(req, res, next) {
    next();
};
exports.submit_menu_post= function(req, res, next) {
    //uploadMenu.fields([{name:'menu_pic'},{name:'ingre_pic'}]);
    var menu_name = req.body.menu_name;
    var content = req.body.content;
    var minTime=req.body.minTime;
    var maxTime=req.body.maxTime;
    console.log(minTime);
    console.log(maxTime);
    var menu_pic = [];
    var menu_pic_name = [];
    var menu_pic_size=[];
    var ingre_pic = [];
    var ingre_pic_name = [];
    var ingre_pic_size = [];
    var upFile = req.files;
    for (var i = 0; i < upFile['menu_pic'].length; i++) {
        if (upFile['menu_pic'][i].fieldname === "menu_pic") {
            menu_pic.push("./img/menu_pic/" + upFile['menu_pic'][i].filename);
            menu_pic_name.push(upFile['menu_pic'][i].filename);
            menu_pic_size.push(upFile['menu_pic'][i].size);
        }
    }
    for (i = 0; i < upFile['ingre_pic'].length; i++) {
        if (upFile['ingre_pic'][i].fieldname === "ingre_pic") {
            if(upFile['ingre_pic'][i].filename) {
                ingre_pic.push("./img/ingre_pic/" + upFile['ingre_pic'][i].filename);
                ingre_pic_name.push(upFile['ingre_pic'][i].filename);
                ingre_pic_size.push(upFile['ingre_pic'][i].size);
            }
        }
    }
    var ingreName = req.body.ingre_name;
    var madeBy = req.body.madeby;
    var ingre_name=[];
    var madeby=[];
    for (i = 0; i < ingreName.length; i++)
    {
        if(ingreName[i])
        {
            if(madeBy[i])
            {
                ingre_name.push(ingreName[i]);
                madeby.push(madeBy[i]);
            }
        }
    }
    var price=req.body.price;
    if(!req.session.passport.user.email)
    {
        res.redirect('/seller');
    }
    else{
        Member.findOne({email:req.session.passport.user.email},function (err,member) {
            var newMenu=new Menu();
            newMenu.member_id=member.email;
            newMenu.address.post=member.address.post;
            newMenu.address.add1=member.address.add1;
            newMenu.address.add2=member.address.add2;
            newMenu.address.x=member.address.x;
            newMenu.address.y=member.address.y;
            newMenu.menu_name=menu_name;
            newMenu.content=content;
            for(i=0;i<menu_pic.length;i++) {
                newMenu.image.push({image_url:menu_pic[i],image_size:menu_pic_size[i], image_name:menu_pic_name[i]});
            }
            for(i=0;i<ingre_name.length;i++) {
                newMenu.ingre.push({ingre_name: ingre_name[i], madeby: madeby[i], ingre_url: ingre_pic[i], ingre_size: ingre_pic_size[i], ingre_image_name:ingre_pic_name[i]});
            }
            newMenu.price=price;
            newMenu.save(function (err) {
                if (err)
                    throw err;
                res.redirect("/seller");
            });
        });
    }
};

exports.del_menu= function (req,res,next) {
    var menuid=req.body.menuid;
    Menu.findById(menuid,function(err,menu){
        for(var i=0;i<menu.image.length;i++)
        {
            var path="./public/img/menu_pic/"+menu.image[i].image_name;
            if (fs.existsSync(path)) {
                fs.unlink(path,
                    function(err){
                        if(err) throw err;
                        console.log('파일을 정상적으로 삭제하였습니다.');
                    }
                );
            }
            /*fs.exists("./public/img/menu_pic/"+menu.image[i].image_name, function (exists) {
                fs.unlink(exists,
                    function(err){
                        if(err) throw err;
                        console.log('파일을 정상적으로 삭제하였습니다.');
                    }
                );
            });*/
        }
        for(i=0;i<menu.ingre.length;i++)
        {
            path="./public/img/ingre_pic/"+menu.image[i].image_name;
            if (fs.existsSync(path)) {
                fs.unlink(path,
                    function(err){
                        if(err) throw err;
                        console.log('파일을 정상적으로 삭제하였습니다.');
                    }
                );
            }
        }
    });
    Menu.findByIdAndRemove(menuid,function (err,result) {
        if (err) return done(err);
        res.send('clear');
    })
};
exports.is_selling= function (req,res,next) {
    var menuid=req.body.menuid;
    Menu.findById(menuid,function(err,menu){
        if(menu.is_selling) menu.is_selling=false;
        else menu.is_selling=true;
        menu.save(function (err) {
            if (err)
                throw err;
            res.send("clear");
        });
    });
};

exports.modifiy_profile=function (req,res,next) {
    Member.findOne({email:req.session.passport.user.email},function (err,member) {
        if (err) return res.status(500).json({error: err});
        Table.find({member_id:member._id},function(err,table){
            if (err) return res.status(500).json({error: err});
            res.render('ModifyProfile',{passport:req.session.passport,member:member,table:table});
        });
    });
};
exports.table_register=function (req,res,next) {
    res.render('TableRegister',{passport:req.session.passport});
};
exports.table_register_post=function (req,res,next) {
    var table_name=req.body.table_name;
    var reservationType=req.body.reservationType;
    var reservationTimeMin=req.body.reservationTimeMin;
    var reservationTimeMax=req.body.reservationTimeMax;
    var orderValueMin=req.body.orderValueMin;
    var peopleCount=req.body.peopleCount;
    var maxTime=req.body.maxTime;
    var member_id=req.body.member_id;
    var newTable=new Table();
    newTable.member_id=member_id;
    newTable.table_name=table_name;
    newTable.reservationType=reservationType;
    newTable.reservationTimeMin=reservationTimeMin;
    newTable.reservationTimeMax=reservationTimeMax;
    newTable.orderValueMin=orderValueMin;
    newTable.peopleCount=peopleCount;
    newTable.maxTime=maxTime;
    newTable.save(function (err) {
        if (err)
            throw err;
        res.send("clear");
    });
};
exports.table_fix=function (req,res,next) {
    Table.findOne({_id:req.params.id},function (err,table) {
        res.render('TableFix',{passport:req.session.passport,table:table});
    });
};
exports.table_fix_post=function (req,res,next) {
    var table_name=req.body.table_name;
    var reservationType=req.body.reservationType;
    var reservationTimeMin=req.body.reservationTimeMin;
    var reservationTimeMax=req.body.reservationTimeMax;
    var orderValueMin=req.body.orderValueMin;
    var peopleCount=req.body.peopleCount;
    var maxTime=req.body.maxTime;
    var member_id=req.body.member_id;
    Table.update({_id:req.body.table_id},{$set:{member_id:member_id,table_name:table_name,reservationType:reservationType,
            reservationTimeMin:reservationTimeMin,reservationTimeMax:reservationTimeMax,orderValueMin:orderValueMin,peopleCount:peopleCount,maxTime:maxTime}},
        function (err,result) {
        if (err) return done(err);
        res.send('clear');
    });
};
exports.table_delete_post=function (req,res,next) {
    console.log(req.body);
    //var data= eval(req.body);
    var tableid=[];
    tableid=req.body.table_id;
    console.log(tableid);
    /*for(var i=0;i<tableid.length;i++)
        tableid.push(tableid[i]);
    console.log(tableid);
    console.log(req.body.sunggyu);*/
    Table.findByIdAndRemove(tableid,function (err,result) {
        if (err) return done(err);
        res.send('clear');
    });
};
exports.manage=function (req,res,next) {
    res.render('OrderManagement_KSW',{passport:req.session.passport});
};