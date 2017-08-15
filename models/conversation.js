/**
 * Created by Sehyeon on 2017-08-10.
 */
/**
 * Created by Sehyeon on 2017-07-20.
 */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var ConverSchema = new Schema({
    //num:{type:Number,required: true},
    from:{type:String,required: true},
    to:{type:String,required: true}
});

//ConverSchema.plugin(autoIncrement.plugin, { model: 'conversation', field: 'num' });

module.exports = mongoose.model('conversation', ConverSchema);
