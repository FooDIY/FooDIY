/**
 * Created by Sehyeon on 2017-07-28.
 */
/**
 * Created by Sehyeon on 2017-07-20.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var certificate = new Schema({
    email:{type:String,required: true},
    token:{type:String,required: true},
    timer:{type:Date,required : true}
});
//password를 암호화
certificate.methods.generateHash = function(token) {
    return bcrypt.hashSync(token, bcrypt.genSaltSync(10));
};
//password의 유효성 검증
certificate.methods.validPassword = function(token) {
    return (this.token===token);
};
module.exports = mongoose.model('cert', certificate);
