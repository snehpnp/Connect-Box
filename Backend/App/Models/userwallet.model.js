const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const User_wallet = Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        index: true
    },
     balance:{
        type: Number,
        default: '0'
     },
     status:{
         type:Number,
         enum:[0,1],
         default:0
     },
     type:{
           type: String,
           default: 'null'
     },
     UserName:{
            type: String,
           default: 'null'
     },
     
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // This enables Mongoose to handle the _id field automatically
    _id: true,
    timestamps: true
});

const User_Wallet = model('User_wallet', User_wallet);
module.exports = User_Wallet;
