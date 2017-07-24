/**
 * Created by Sehyeon on 2017-07-20.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    email:String,
    pw:String,
    nick:String,
    sumnail:String,
    sellercheck:Boolean,
    cellphone:String,
    address:{
        post:String,
        add1:String,
        add2:String
    },
    mailing:Boolean,
    text:Boolean,
    submit_date:{ type: Date, default: Date.now  },
    last_login:Date,
    last_login_ip:String
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
