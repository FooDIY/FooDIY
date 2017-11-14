/**
 * Created by Kiyeong on 2017-08-10.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TempSchema = new Schema({
    naver:{
      id:String,
      token:String,
      email:String
    },
    google: {
      id: String,
      token: String,
      email: String
    },
    temp_date:Date
});

module.exports = mongoose.model('temp', TempSchema);
