const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const strategyOrderSchema = Schema({
    strategy_name: {
        type: String,
    
    },
    plan_name: {
        type: String,
        default: null
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        index: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        index: true
    },
    strategy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "strategy",
        index: true
    },
    order_id: {
        type: String,
        default: null
    },
    amount: {
        type: String,
        default: null
    },
    receipt: {
        type: String,
        default: null
    },
    User_data: {
        type: String,
        default: null
    },
    razorpay_order_id: {
        type: String,
        default: null
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    },
    order_status: {
        type: String,
        default: null
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

const strategy_Order = model('strategy_Order', strategyOrderSchema);
module.exports = strategy_Order;
