const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    strategyname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const strategy=new mongoose.model("strategy",strategySchema);
module.exports=strategy;