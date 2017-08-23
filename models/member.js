/**
 * Created by Sehyeon on 2017-07-20.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    email:{type:String},
    pw:{type:String},
    //nick:{type:String,required: true},
    firstname:{type:String},
    lastname:{type:String},
    sumnail:String,
    sellercheck:{type:Boolean,default:false},
    cellphone:String,
    address:{
        post:String,
        add1:String,
        add2:String,
        x:Number,
        y:Number
    },
    naver:{
      id:String,
      token:String,
      name:String,
      email:String,
      username:String
    },
    google: {
    id: String,
    token: String,
    email: String,
    name: String
    },
    mailing:Boolean,
    text:Boolean,
    submit_date:{ type: Date, default: moment().format()  },
    last_login:Date,
    last_login_ip:String,
    is_certificate:{type:Boolean,default:false},
    provider:String
});


//password를 암호화
MemberSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//password의 유효성 검증
MemberSchema.methods.validPassword = function(password) {
    var user=this;
    return bcrypt.compareSync(password, user.pw);
};
module.exports = mongoose.model('member', MemberSchema);
