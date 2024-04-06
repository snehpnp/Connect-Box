const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const newMessage = new mongoose.Schema({
    ownerId: {
        type: ObjectId,
        ref: "USER",
    },
    strategyId: {
        type: ObjectId,
        ref: "strategies",
    },
    brokerId: {
        type: ObjectId,
        
    },
    messageTitle: {
        type: String,
        required: true
    },


    Role: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MessageData = mongoose.model('MessageData', newMessage);
module.exports = MessageData;
