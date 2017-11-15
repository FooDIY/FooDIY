var express = require('express');
var router = express.Router();
var controller=require('./indexcont');
/* GET home page. */
router.get('/', controller.home);
router.get('/Login', controller.login);
router.get('/MenuList', controller.menulist);
router.get('/SignUp', controller.signup);


module.exports = router;
