var express = require('express');
var router = express.Router();
var controller=require('./userController');

/* GET home page. */
router.get('/Validation',controller.emailValidation);
router.get('/confirm_certificate/:id',controller.emailConfirm);
router.get('/GoogleSignUpCallback',controller.googleSignupCallback);
router.get('/NaverSignUpCallback',controller.naverSignupCallback);
router.get('/NaverSignUpTemp',controller.additionCheck,controller.naverSignupTemp);
router.get('/LoginNaver', controller.loginNaver);
router.get('/NaverSignInCallback', controller.naverSigninCallback);
router.get('/LoginGoogle', controller.loginGoogle);
router.get('/GoogleSignInCallback', controller.googleSigninCallback);
router.get('/SignUpGoogle',controller.signupGoogle);
router.get('/SignUpNaver',controller.signupNaver);
router.get('/profile',controller.profile);
/* POST home page. */
router.post('/SignUp',controller.normalsignup);
router.post('/login', controller.loginAttemp);
router.post('/reconfirm',controller.reconfirm);
router.post('/NaverSignUpTemp',controller.postSignupTemp);


module.exports = router;
