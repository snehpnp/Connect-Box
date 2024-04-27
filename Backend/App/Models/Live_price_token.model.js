const mongoose = require('mongoose');

const LivePriceTokenSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        index: true
    },
    broker_id: {
        type: String,
        default: null
    },
    demate_user_id: {
        type: String,
        default: null
    },
    demate_user_id_second: {
        type: String,
        default: null
    },
    access_token: {
        type: String,
        default: null

    },
    trading_status: {
        type: String,
        default: null
    },
    Role: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
     Stock_chain: {
        type: String,
        default: null

    },
    
},
    {
        timestamps: true,
        _id: true,
    });

const live_price_token_data = mongoose.model('Live_price_token', LivePriceTokenSchema);
module.exports = live_price_token_data;
