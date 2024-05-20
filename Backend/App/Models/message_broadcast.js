const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const newMessage = new mongoose.Schema({
  ownerId: {
    type: ObjectId,
    ref: "USER",
  },
  strategyId: {
    type: ObjectId,
    ref: "strategies",
    default:null

  },
  brokerId: {
    type: String,
    ref: "api_create_infos",
    default:null
  },
  subAdminId: [{
    type: ObjectId,
    ref: "users",
  }],
  messageTitle: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessageData = mongoose.model("MessageData", newMessage);
module.exports = MessageData;
