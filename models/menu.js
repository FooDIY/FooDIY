/**
 * Created by Sehyeon on 2017-08-03.
 */
/**
 * Created by Sehyeon on 2017-07-20.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MenuSchema = new Schema({
    member_id:{type:String,required: true},
    menu_name:{type:String,required: true},
    content:{type:String,required: true},
    image:[{
        image_name:{type:String,required: true},
        image_url:{type:String,required: true},
        image_size:{type:String,required:true}
    }],
    address:{
        post:String,
        add1:String,
        add2:String,
        x:Number,
        y:Number
    },
    ingre:[{
        ingre_name:String,
        madeby:String,
        ingre_image_name:String,
        ingre_url:String,
        ingre_size:String
    }],
    price:{type:Number,required: true},
    amount:{type:Number},
    submit_date:{ type: Date, default: moment().format()  },
    hit:{ type: Number, default: 0},
    star:{type: Number, default: 0},
    comment:{type:Number, default: 0},
    is_selling:{type:Boolean, default: false}
});

module.exports = mongoose.model('menu', MenuSchema);
