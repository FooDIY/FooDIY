var express = require('express');
var router = express.Router();
var cert = require('../models/certificate');
var Member = require('../models/member');
var moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/confirm_certificate/:id',function (req,res,next) {
  var token = req.params.id;
  cert.findOne({token: token}, function (err, member) {
    if(err){ return next(err);}
    if(!member)
    {
      res.redirect('/');
    }
    else
    {
      if(member.timer<moment().format())
      {
        cert.remove({email:member.email},function(err,output){
            if(err){ return next(err);}
        });
          res.render('completecert',{safe:false});
      }
      else{
        cert.remove({email:member.email},function(err,output){
            if(err){ return next(err);}
        });
        Member.findOne({email:member.email},function(err,user){
          user.is_certificate=true;
          user.save(function (err) {
              if (err)
                  throw err;
              res.render('completecert',{safe:true});
          });
        })
      }
    }
  });
});
module.exports = router;
