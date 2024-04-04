const { Schema, model } = require('mongoose');
//  const mongoose = require('mongoose');


const countLicenseSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    Balance: {
        type: String,
        
    },
    admin_Balance: {
        type: String

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: "USER",
        default: null 
    },
    Role: {
        type: String,
        default: null 
    },
    Mode: {
        type: String,
        default: null 
    },
}, {
    // This enables Mongoose to handle the _id field automatically
    _id: true,
    timestamps: true
});

const count_licenses = model('count_license', countLicenseSchema);
module.exports = count_licenses;
