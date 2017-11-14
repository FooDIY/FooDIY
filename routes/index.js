var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home', { title: 'Express' });
});
router.get('/Login', function(req, res, next) {
    res.render('Login');
});
router.get('/MenuList', function(req, res, next) {
    res.render('MenuList');
});
router.get('/SignUp', function(req, res, next) {
    res.render('SignUp');
});
module.exports = router;
