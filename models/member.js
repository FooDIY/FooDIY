/**
 * Created by Sehyeon on 2017-07-20.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    email:{type:String,required: true},
    pw:{type:String,required: true},
    //nick:{type:String,required: true},
    firstname:{type:String,required: true},
    lastname:{type:String,required: true},
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
    mailing:Boolean,
    text:Boolean,
    submit_date:{ type: Date, default: moment().format()  },
    last_login:Date,
    last_login_ip:String,
    is_certificate:{type:Boolean,default:false}
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
