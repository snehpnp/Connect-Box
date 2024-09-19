const { Schema, model } = require('mongoose');

const TradePermissionLogSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    msg: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
  
}, {
    _id: true,
    timestamps: true
});

const TradePermissionLogs = model('tradepermission_logs', TradePermissionLogSchema);
module.exports = TradePermissionLogs;
