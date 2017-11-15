var express = require('express');
var router = express.Router();
var controller=require('./userController');
/* GET home page. */
router.get('/Validation',controller.emailValidation);
router.post('/SignUp',controller.normalsignup);
module.exports = router;
