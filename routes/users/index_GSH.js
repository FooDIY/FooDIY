var express = require('express');
var router = express.Router();
var controller=require('./userController');

/* GET home page. */
router.get('/Validation',controller.emailValidation);
router.get('/confirm_certificate/:id',controller.emailConfirm);

/* POST home page. */
router.post('/SignUp',controller.normalsignup);
router.post('/login', controller.loginAttemp);
router.post('/reconfirm',controller.reconfirm );
module.exports = router;
