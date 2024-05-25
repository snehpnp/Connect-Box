const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const strategy_transactionSchema = Schema({
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
    Start_Date: {
        type: Date,
        required: true
    },
    End_Date: {
        type: Date,
        required: true
    },
    plan_id: {
        type: String,
        enum: ['0', '1', '2', '3', '4','10'],
        default: '0'
    },
    stg_charge: {
        type: String,
        default: '0'
    },
    Admin_charge: {
        type: String,
        default: '0'
    },
    Research_charge: {
        type: String,
        default: '0'
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

const strategy_transaction = model('strategy_transaction', strategy_transactionSchema);
module.exports = strategy_transaction;
