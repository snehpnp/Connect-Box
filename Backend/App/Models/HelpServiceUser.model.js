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
  prifix_key :{
    type: String,
    Required: true,
  }
});


const userhelpdata = mongoose.model("userHelp",helpmessage)
module.exports = userhelpdata;
