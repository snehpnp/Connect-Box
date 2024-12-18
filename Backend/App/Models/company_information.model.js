const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    panel_name: {
        type: String,
        required: true,
        unique: true
    },
    panel_short_name: {
        type: String,
        required: true,
        unique: true
    },
    panel_key: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        required: true,
        unique: true
    },
    domain_url: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    domain_url_https: {
        type: String,
        required: true
    },
    broker_url: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ""
    }, smtp_password: {
        type: String,
        default: ""
    }, cc_mail: {
        type: String,
        default: ""
    },
    bcc_mail: {
        type: String,
        default: ""
    }, smtphost: {
        type: String,
        default: ""
    },
    smtpport: {
        type: String,
        default: ""
    },
    logo: {
        type: String,
        default: ""
    },
    favicon: {
        type: String,
        default: ""
    },
    watermark: {
        type: String,
        default: ""
    },
    loginimage: {
        type: String,
        default: ""
    },

    Balance: {
        type: Number
    },
    razor_payment_key: {
        type: String,
        default: ""
    },
    razor_payment_secretKey: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    BackendSocketurl: {
        type: String,
        default: ""
    }
}, {
    // This enables Mongoose to handle the _id field automatically
    _id: true,
});

const company = mongoose.model('company', CompanySchema);
module.exports = company;
