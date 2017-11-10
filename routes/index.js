var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
    res.render('Login', { title: 'Express' });
});
router.get('/menulist', function(req, res, next) {
    res.render('MenuList', { title: 'Express' });
});
router.get('/s', function(req, res, next) {
    res.render('SignUp', { title: 'Express' });
});
module.exports = router;
