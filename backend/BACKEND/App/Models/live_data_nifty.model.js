const mongoose = require('mongoose');

const LiveDataniftySchema = new mongoose.Schema({
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
        default: "Nifty",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const LiveDataNifty = mongoose.model('nifty_livedata', LiveDataniftySchema);
module.exports = LiveDataNifty;
