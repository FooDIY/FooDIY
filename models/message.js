/**
 * Created by Sehyeon on 2017-08-10.
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    moment = require('moment'),
    autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    conver_id:{type:String,required: true},
    from:{type:String,required: true},
    content:{type:String, required:true},
    time_created:{type:Date, default:moment().format()}
});
module.exports = mongoose.model('message', MessageSchema);
