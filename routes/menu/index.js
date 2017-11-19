/**
 * Created by Sehyeon on 2017-11-20.
 */
var express = require('express');
var app=express();
var router = express.Router();
var controller=require('./menuController');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



/* GET home page. */
router.get('/:id', controller.menuinfo);
/* POST home page. */
module.exports = router;
