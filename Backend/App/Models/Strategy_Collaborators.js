const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const stgCollaboratorsSchema = new mongoose.Schema({
    researcher_id: {
        type: Schema.Types.ObjectId,
        ref: "USER",
        default: null
    },
    Collaborators_id: {
        type: Schema.Types.ObjectId,
        ref: "USER",
        default: null
    },
    total_amount: {
        type: Number,
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

const Stg_Collaborators = mongoose.model('straregy_collaborators', stgCollaboratorsSchema);
module.exports = Stg_Collaborators;
