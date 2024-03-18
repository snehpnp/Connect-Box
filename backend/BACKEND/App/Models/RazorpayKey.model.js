const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const razorpayKeySchema = Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    razorpayKey: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // This enables Mongoose to handle the _id field automatically
    _id: true,
    timestamps: true
});

const razorpayKey = model('razorpayKey', razorpayKeySchema);
module.exports = razorpayKey;
