const mongoose = require("mongoose");

let helpmessage = new mongoose.Schema({
  UserName: {
    type: String,
    Required: true,
  },
  Email: {
    type: String,
    Required: true,
  },
  mobile: {
    type: Number,
    Required: true,
  },
  Message: {
    type: String,
    Required: true,
  },
  Role: {
    type: String,
    required: true,
},
prifix_key :{
  type: String,
  
}

});


const messageHelpData = mongoose.model("Help",helpmessage)
module.exports = messageHelpData;
