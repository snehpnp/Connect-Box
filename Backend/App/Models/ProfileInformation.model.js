const mongoose = require('mongoose');

const ProfileInfo = new mongoose.Schema({
  
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        
    },
    Address:{
    type: String,
    required: true
  },
  Country:{
    type: String,
    required: true
  },
  State:{
    type: String,
    required: true
  },
  Location:{
    type: String,
    required: true
  },
  DOB:{
    type: String,
    required: true
  },
  CompanyName:{
    type: String,
    required: true
  },
});

const profieAdditonalInfo = mongoose.model('ProfileInfo', ProfileInfo);

module.exports = profieAdditonalInfo;
