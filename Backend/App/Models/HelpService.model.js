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
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },


  prifix_key: {
    type: String,

  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  Category: {
    type: String, 
   
    
  }
  

} ,{
  // This enables Mongoose to handle the _id field automatically
  _id: true,
  timestamps: true
});


const messageHelpData = mongoose.model("Help", helpmessage)
module.exports = messageHelpData;
