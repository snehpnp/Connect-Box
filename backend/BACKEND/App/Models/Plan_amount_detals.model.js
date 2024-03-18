const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const planAmountDetalsSchema = Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        index: true
    },
    monthly: {
        type: Number,
        default: 0
    },
    quarterly: {
        type: Number,
        default: 0
    },
    halfyearly: {
        type: Number,
        default: 0
    },
    yearly: {
        type: Number,
        default: 0
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

const plan_amount_details = model('plan_amount_details', planAmountDetalsSchema);
module.exports = plan_amount_details;
