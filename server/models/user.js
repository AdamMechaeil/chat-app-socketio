const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender:{
    type:String,
    required:true
  },
  phone:{
    type:String
  },
  age:{
    type:String
  },
  friends: {
    type: Array,
    default: [],
  },
  followRequestsReceived: {
    type: Array,
    default: [],
  },
  followRequestsSent: {
    type: Array,
    default: [],
  },
});
const User=mongoose.model("User",userSchema);
module.exports=User;