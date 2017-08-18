/**
 * Created by Sehyeon on 2017-08-18.
 */
var mongoose = require('mongoose');
var moment = require('moment');

//var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    //num:{type:Number,required: true},
    menu_id:{type:String,required: true},
    email:{type:String,required: true},
    text:{type:String,required: true},
    submit_date:{ type: Date, default: moment().format()}
});

//ConverSchema.plugin(autoIncrement.plugin, { model: 'conversation', field: 'num' });

module.exports = mongoose.model('comment', CommentSchema);
