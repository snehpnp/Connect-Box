const { Schema, model } = require('mongoose');
//  const mongoose = require('mongoose');


const tradeChargeSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    order_id: {
        type: String,
        default: null
    },
    user_charge: {
        type: String,
        default: null
    },
    admin_charge: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
  
}, {
    // This enables Mongoose to handle the _id field automatically
    _id: true,
    timestamps: true
});

const trade_charge = model('trade_charge', tradeChargeSchema);
module.exports = trade_charge;
