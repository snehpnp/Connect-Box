const mongoose = require('mongoose');

const subadminActivitySchema = new mongoose.Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    login_status: {
        type: String,
        default: null
    },
    trading_status: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: null
    },
    device: {
        type: String,
        default: null
    },
    system_ip: {
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
});

const subadmin_logs = mongoose.model('subadmin_logs', subadminActivitySchema);
module.exports = subadmin_logs;
