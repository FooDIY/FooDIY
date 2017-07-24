/**
 * Created by Sehyeon on 2017-07-20.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    /*if (req.isAuthenticated()){
        console.log("logged in");
        res.render('manage_menu');
    } else {
        res.redirect('/');
    }*/
    res.render('manage_menu');
});

module.exports = router;
