/**
 * Created by Sehyeon on 2017-07-24.
 */
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB 모델
var Member = require('../models/member');
var Menu = require('../models/menu');
//세션
var session=require('express-session');
app.use(session({
    secret: '123456789!@#$',
    resave: false,
    saveUninitialized: true
}));

//패스포트
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

//시간형식
var moment = require('moment');

//파일 입력용
var multer=require('multer');
var Menu_storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/'+file.fieldname);
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"!"+file.originalname);
    }
});

var maxMenuImageConut=4;
var maxIngreImageConut=4;

var uploadMenu=multer({storage:Menu_storage});
/*var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
 // we're connected!
 });*/

//파일 삭제용
var fs = require('fs');

function logincheck (req,res,next) {
    if(!req.session.user)
    {
        res.redirect('/seller');
    }
    else if(!req.session.seller)
    {
        res.redirect('/seller/submit_seller');
    }
    else
    {
        return next();
    }
}
function sellercheck (req,res,next) {
    if(!req.session.user)
    {
        res.redirect('/seller');
    }
    else if(req.session.seller)
    {
        res.redirect('/seller/manage');
    }
    else
    {
        return next();
    }
}
/* GET home page. */
router.get('/', function(req, res, next) {
    /*if (req.isAuthenticated()){
     console.log("logged in");
     res.render('manage_menu');
     } else {
     res.redirect('/');
     }*/
    res.render('login_in');
});
router.get('/manage' ,logincheck,function(req, res, next) {
    Member.findOne({ email : req.session.user }, function(err, member) {
        Menu.find({member_id:req.session.user},function (err, menu) {
            res.render('manage_menu',{member:member,menu:menu});
        });
    });
});
router.post('/del_menu',logincheck,function (req,res,next) {
    var menuid=req.body.menuid;
    Menu.findById(menuid,function(err,menu){
        for(var i=0;i<menu.image.length;i++)
        {
            fs.unlink("./public/menu_pic/"+menu.image[i].image_name,
                function(err){
                    if(err) throw err;
                    console.log('파일을 정상적으로 삭제하였습니다.');
                }
            );
        }
        for(i=0;i<menu.ingre.length;i++)
        {
            fs.unlink("./public/ingre_pic/"+menu.ingre[i].ingre_image_name,
                function(err){
                    if(err) throw err;
                    console.log('파일을 정상적으로 삭제하였습니다.');
                }
            );
        }
    });
    Menu.findByIdAndRemove(menuid,function (err,result) {
        if (err) return done(err);
        res.send('clear');
    })
});
router.get('/submit_menu',/*logincheck,*/function(req, res, next) {
    res.render('become_foodiy2');
});
router.post('/submit_menu', uploadMenu.fields([{name:'menu_pic'},{name:'ingre_pic'}]),function(req, res, next) {
    var menu_name = req.body.menu_name;
    var content = req.body.content;
    var menu_pic = [];
    var menu_pic_name = [];
    var menu_pic_size=[];
    var ingre_pic = [];
    var ingre_pic_name = [];
    var ingre_pic_size = [];
    var upFile = req.files;
    for (var i = 0; i < upFile['menu_pic'].length; i++) {
        if (upFile['menu_pic'][i].fieldname === "menu_pic") {
            menu_pic.push("../menu_pic/" + upFile['menu_pic'][i].filename);
            menu_pic_name.push(upFile['menu_pic'][i].filename);
            menu_pic_size.push(upFile['menu_pic'][i].size);
        }
    }
    for (i = 0; i < upFile['ingre_pic'].length; i++) {
        if (upFile['ingre_pic'][i].fieldname === "ingre_pic") {
            if(upFile['ingre_pic'][i].filename) {
                ingre_pic.push("../ingre_pic/" + upFile['ingre_pic'][i].filename);
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
    var amount=req.body.amount;
    var newMenu=new Menu();
    newMenu.member_id=req.session.user;
    newMenu.menu_name=menu_name;
    newMenu.content=content;
    for(i=0;i<menu_pic.length;i++) {
        newMenu.image.push({image_url:menu_pic[i],image_size:menu_pic_size[i], image_name:menu_pic_name[i]});
    }
    for(i=0;i<ingre_name.length;i++) {
        newMenu.ingre.push({ingre_name: ingre_name[i], madeby: madeby[i], ingre_url: ingre_pic[i], ingre_size: ingre_pic_size[i], ingre_image_name:ingre_pic_name[i]});
    }
    newMenu.price=price;
    newMenu.amount=amount;
    newMenu.save(function (err) {
        if (err)
            throw err;
        res.redirect("/seller/manage");
    });
});
/*router.post('/submit_menu',uploadMenu.array('menu_pic'),uploadIngre.array('ingre_pic',maxIngreImageConut), function(req, res, next) {
    var menu_name = req.body.menu_name;
    var content = req.body.content;
    var upFile = req.files;
    console.log(upFile);
    var menu_pic = [];
    var ingre_pic = [];
    for (var i = 0; i < upFile.length; i++) {
        if (upFile[i].fieldname === "menu_pic") {
            menu_pic.push("../../Menu/" + upFile[i].filename);
        }
        else if (upFile[i].fieldname === "ingre_pic") {
            ingre_pic.push("../../Menu/" + upFile[i].filename);
        }
    }
    var ingreName = req.body.ingre_name;
    var madeBy = req.body.madeby;
    var ingre_name=[];
    var madeby=[];

    for (i = 0; i < ingreName.length; i++)
    {
        ingre_name.push(ingreName[i]);
        madeby.push(madeBy[i]);
    }
    var price=req.body.price;
    var amount=req.body.amount;
    console.log(menu_pic);
    res.redirect("/seller/submit_menu");
    /*Member.findOne({ email : req.session.user }, function(err, member) {
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
                res.send('clear');
            });
        }
    });*
});*/
router.get('/submit_seller', sellercheck, function(req, res, next) {
    res.render('become_foodiy');
});
router.post('/submit_seller', function(req, res, next) {
    var choice_mail=req.body.choice_mail;
    var tell=req.body.tell;
    var choice_sms=req.body.choice_sms;
    var post=req.body.post;
    var add1=req.body.add1;
    var add2=req.body.add2;
    var pointx=req.body.pointx;
    var pointy=req.body.pointy;
    Member.findOne({ email : req.session.user }, function(err, member) {
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
                res.send('clear');
            });
        }
    });
});
router.get('/jusoPopup', function(req, res, next) {
    res.render('juso');
});
router.post('/jusoPopup', function(req, res, next) {
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
});
router.get('/juso', function(req, res, next) {
    res.render('jusoindex');
});
module.exports = router;