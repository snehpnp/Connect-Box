const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const strategySchema = Schema({
    strategy_name: {
        type: String,
    },
    stgname_adminid: {
        type: String,
        unique: true
    },
    strategy_description: {
        type: String,
        default: null
    },
    strategy_demo_days: {       //ID :0
        type: String,
        default: 0
    },
    security_fund_month: {     //ID :1
        type: String,
        default: null
    },
    security_fund_quarterly: {  //ID :2
        type: String,
        default: null
    },
    security_fund_half_early: { //ID :3
        type: String,
        default: null
    },
    security_fund_early: {   //ID :4
        type: String,
        default: null
    },
    fixed_amount_per_trade_month: {     //ID :1
        type: String,
        default: null
    },
    fixed_amount_per_trade_quarterly: {  //ID :2
        type: String,
        default: null
    },
    fixed_amount_per_trade_half_early: { //ID :3
        type: String,
        default: null
    },
    fixed_amount_per_trade_early: {   //ID :4
        type: String,
        default: null
    },

    strategy_category: {
        type: String,
        default: null
    },

    strategy_segment: {
        type: String,
        default: null,
        index: true
    },

    strategy_indicator: {
        type: String,
        default: null
    },
    strategy_tester: {
        type: String,
        default: null
    },
    strategy_image: {
        type: String,
        default: null
    },
    maker_id: {
        type: Schema.Types.ObjectId,
        ref: "USER",
        default: null
    },
    researcher_id: {
        type: Schema.Types.ObjectId,
        ref: "USER",
        default: null
    },
    max_trade: {
        type: String,
        default: null
    },
    strategy_percentage: {
        type: String,
        default: null
    },
    Service_Type: {
        type: String,
        enum: ['0','1', '2'], // 0 = No Use , 1= Fixed , 2= per trade
        default: '0'
    },
    purchase_type: {
        type: String,
        default: null
    },
    End_Date: {
        type: Date,
        default: null
    },
    ActiveStatus: {
        type: String,
        enum: ['1', '0'],
        default: '1'
    },
    research_strategy_percentage: {
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

const strategy = model('strategy', strategySchema);
module.exports = strategy;
