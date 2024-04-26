const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    admin_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    category: {
        type: String,
        default: null
    },

    message: {
        type: String,
        default: null
    },
    maker_role: {
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

const activity_logs = mongoose.model('activity_logs', ActivitySchema);
module.exports = activity_logs;
