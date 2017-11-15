var express = require('express');
var router = express.Router();
var controller=require('./sellerController');
/* GET home page. */
router.get('/seller_submit', /*sellercheck,*/ function(req, res, next) {
    res.render('Seller_Submit');
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
    Member.findOne({ email : req.session.email }, function(err, member) {
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
                req.session.seller=true;
                res.send('clear');
            });
        }
    });
});

module.exports = router;
