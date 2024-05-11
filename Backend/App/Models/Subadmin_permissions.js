const mongoose = require('mongoose');

const SubadminPermission_Schema = new mongoose.Schema({

    employee_add: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    employee_edit: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    license_permision: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    go_To_Dashboard: {
        type: Number,
        enum: [0, 1],   // 0 = NOT ACTIVE GO TO DASHBOARD  , 1 = ACTIVE GO TO DASHBOARD
        default: 0
    },
    trade_history_old: {
        type: Number,
        enum: [0, 1],   // 0 == OLD VIEW ON  , 1 = ONLY TODAY VIEW
        default: 0
    },
    Update_Api_Key: {
        type: Number,
        enum: [0, 1],   // 0 == OLD VIEW ON  , 1 = ONLY TODAY VIEW
        default: 0
    },
    detailsinfo: {
        type: Number,
        enum: [0, 1],   // 0 == OLD VIEW ON  , 1 = ONLY TODAY VIEW
        default: 0
    },
    show_all_users: {
        type: Number,
        enum: [0, 1],   // 0 == OLD VIEW ON  , 1 = ONLY TODAY VIEW
        default: 0
    },
    show_employee_users: {
        type: Number,
        enum: [0, 1],   // 0 == OLD VIEW ON  , 1 = ONLY TODAY VIEW
        default: 0
    },
    strategy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'strategies',
            default: null
        }
    ],
    group_services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'servicegroupnames',
            default: null
        }
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    _id: true,
    timestamps: true
});

const Subadmin_Permission = mongoose.model('subadmin_permission', SubadminPermission_Schema);
module.exports = Subadmin_Permission;
