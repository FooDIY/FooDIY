var express = require('express');
var router = express.Router();
var controller=require('./sellerController');

/* GET home page. */
router.get('/seller_submit', /*sellercheck,*/ controller.seller_submit);
router.get('/jusoPopup', controller.juso_popup);

/* POST home page. */
router.post('/seller_submit', controller.seller_submit_post);
router.post('/jusoPopup', controller.juso_popup_post);
/*router.get('/juso', function(req, res, next) {
    res.render('jusoindex');
});*/
module.exports = router;
