const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const strategy_clientSchema = Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        index: true
    },
    user_id: {
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
        enum: ['0', '1', '2', '3', '4','10'],     //Todays=10,Demo=0,Month=1,quterly=2,halfyearly=3,yearly=4  
        default: '0'
    },
    ActiveStatus: {
        type: String,
        enum: ['0', '1'], // 1 = Strategy wise , 2 = Per Trade Wise
        default: '1'
    },
    uniqueUserStrategy: {
        type: String,
        default: null,
        unique: true,
    },
    trade_charge: {
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

const strategy_client = model('strategy_client', strategy_clientSchema);
module.exports = strategy_client;
