const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
  //__v 這個是默認顯示所以也影藏
  __v:{type:Number,select:false},
  name: { type: String, require: true },
  //select:false  在取得response時不會顯示password
  password:{type:String, require:true ,select:false}
  
  //age:{type:Number,default:0}
});
//定義json格式,輸入後資訊會被轉成string
//require:true 代表這個屬性是必選的,如果沒有這個name就會顯示error

module.exports = model("User", userSchema);
