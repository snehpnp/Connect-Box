const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const SubCompanySchema = new mongoose.Schema({
    panel_name: {
        type: String,
        default: ""

    },

    email: {
        type: String,
        default: ""
    },
    smtp_password: {
        type: String,
        default: ""
    },
    cc_mail: {
        type: String,
        default: ""
    },
    bcc_mail: {
        type: String,
        default: ""
    },
     smtphost: {
        type: String,
        default: ""
    },
    smtpport: {
        type: String,
        default: ""
    },
    razor_payment_key: {
        type: String,
        default: ""
    },
    razor_payment_secretKey: {
        type: String,
        default: ""
    },
    logo: {
        type: String,
        default: ""
    },
    maker_id: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // This enables Mongoose to handle the _id field automatically
    _id: true,
});

const Subadmincompany = mongoose.model('Subadmincompany', SubCompanySchema);
module.exports = Subadmincompany;
