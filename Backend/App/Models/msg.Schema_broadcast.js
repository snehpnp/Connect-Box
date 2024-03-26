const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    strategyName: {
        type: String,
        required: true,
        unique: true
    },
     brokerName: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', msgSchema);
module.exports = Message;
