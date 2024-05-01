const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const researcher_strategySchema = Schema({
    strategy_name: {
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
    max_trade: {
        type: String,
        default: null
    },
    strategy_percentage: {
        type: String,
        default: null
    },
    monthly_charges: {
        type: String,
        default: null
    },
    security_fund: {
        type: String,
        default: null
    },
    collaboration_id:[ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
       }
    ],
    Service_Type: {
        type: String,
        enum: ['0','1', '2'], // 0 = No Use , 1= Fixed , 2= per trade
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

const researcher_strategy = model('researcher_strategy', researcher_strategySchema);
module.exports = researcher_strategy;
