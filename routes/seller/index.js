var express = require('express');
var app=express();
var router = express.Router();
var controller=require('./sellerController');
var bodyParser = require('body-parser');
var multer=require('multer');

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


/* GET home page. */
router.get('/', controller.seller_main);
router.get('/seller_submit', /*sellercheck,*/ controller.seller_submit);
router.get('/jusoPopup', controller.juso_popup);
router.get('/submit_menu', controller.submit_menu);
/* POST home page. */
router.post('/seller_submit', controller.seller_submit_post);
router.post('/jusoPopup', controller.juso_popup_post);
router.post('/submit_menu', uploadMenu.fields([{name:'menu_pic'},{name:'ingre_pic'}]), controller.submit_menu_post);
router.post('/del_menu', controller.del_menu);
router.post('/is_selling', controller.is_selling);
module.exports = router;
