/**
 * Created by Sehyeon on 2017-08-03.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MenuSchema = new Schema({
    menu_id:{type:String,required: true},
    menu_name:{type:String,required: true},
    content:{type:String,required: true},
    image:[{
        image_url:{type:String,required: true},
        image_size:{type:String,required:true}
    }],
    ingre:[{
        ingre_name:String,
        madeby:String,
        ingre_url:String
    }],
    price:{type:Number,required: true},
    amount:{type:Number,required: true},
    submit_date:{ type: Date, default: moment().format()  },
    hit:Number
});

module.exports = mongoose.model('menu', MenuSchema);