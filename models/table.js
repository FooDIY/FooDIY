/**
 * Created by Sehyeon on 2017-11-20.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MenuSchema = new Schema({
    member_id:{type:String,required: true},
    table_name:{type:String,required: true},
    reservationType:{type:Number,required: true},
    reservationTimeMin:{type:String},
    reservationTimeMax:{type:String},
    orderValueMin:{type:Number},
    peopleCount:{type:Number},
    maxTime:{type:Number}
});

module.exports = mongoose.model('table', MenuSchema);