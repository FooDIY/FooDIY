var express = require('express');
var app=express();
var router = express.Router();
var controller=require('./sellerController');
var bodyParser = require('body-parser');
var multer=require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Member = require('../../models/member');
var Menu = require('../../models/menu');

var Menu_storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/'+file.fieldname);
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"!"+file.originalname);
    }
});
var uploadMenu=multer({storage:Menu_storage});


/* GET home page. */
router.get('/seller_submit', /*sellercheck,*/ controller.seller_submit);
router.get('/jusoPopup', controller.juso_popup);
router.get('/submit_menu', controller.submit_menu);
/* POST home page. */
router.post('/seller_submit', controller.seller_submit_post);
router.post('/jusoPopup', controller.juso_popup_post);
router.post('/submit_menu', controller.uploadMenu, controller.submit_menu_post);
/*router.post('/submit_menu', uploadMenu.fields([{name:'menu_pic'},{name:'ingre_pic'}]), function(req, res, next) {
    var menu_name = req.body.menu_name;
    var content = req.body.content;
    var minTime=req.body.minTime;
    var maxTime=req.body.maxTime;
    var menu_pic = [];
    var menu_pic_name = [];
    var menu_pic_size=[];
    var ingre_pic = [];
    var ingre_pic_name = [];
    var ingre_pic_size = [];
    var upFile = req.files;
    console.log(upFile);
    for (var i = 0; i < upFile['menu_pic'].length; i++) {
        if (upFile['menu_pic'][i].fieldname === "menu_pic") {
            menu_pic.push("../img/menu_pic/" + upFile['menu_pic'][i].filename);
            menu_pic_name.push(upFile['menu_pic'][i].filename);
            menu_pic_size.push(upFile['menu_pic'][i].size);
        }
    }
    for (i = 0; i < upFile['ingre_pic'].length; i++) {
        if (upFile['ingre_pic'][i].fieldname === "ingre_pic") {
            if(upFile['ingre_pic'][i].filename) {
                ingre_pic.push("../img/ingre_pic/" + upFile['ingre_pic'][i].filename);
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
    if(!req.session.email)
    {
        res.redirect('/seller');
    }
    else{
        Member.findOne({email:req.session.email},function (err,member) {
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
                res.redirect("/seller/manage");
            });
        });
    }
});
/*router.get('/juso', function(req, res, next) {
    res.render('jusoindex');
});*/
module.exports = router;
