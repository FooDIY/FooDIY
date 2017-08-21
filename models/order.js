/**
 * Created by Sehyeon on 2017-08-19.
 */
/**
 * Created by Sehyeon on 2017-08-10.
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    moment = require('moment'),
    autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    seller:{type:String,required: true},
    customer:{type:String,required: true},
    menu_id:{type:String, required:true},
    amount:{type:Number, required:true},
    total_value:{type:Number, required:true},
    order_time:{type:Date, default:moment().format()},
    visit_time:{type:Date, required:true}
});
module.exports = mongoose.model('order', OrderSchema);
