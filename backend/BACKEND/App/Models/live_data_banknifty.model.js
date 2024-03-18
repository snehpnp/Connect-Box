const mongoose = require('mongoose');

const LiveDataBankniftySchema = new mongoose.Schema({
    _id: {
        type: Date,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: true,
        unique: true,
    },
    time: {
        type: String,
        required: true,
    },
    volume: {
        type: String,
        required: true,
    },
    high: {
        type: String,
        required: true,
    },
    low: {
        type: String,
        required: true,
    },
    close: {
        type: Number,
        required: true,
        default: 0,
    },
    open: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: "BankNifty",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const LiveDataBankNifty = mongoose.model('Banknifty_livedata', LiveDataBankniftySchema);
module.exports = LiveDataBankNifty;
