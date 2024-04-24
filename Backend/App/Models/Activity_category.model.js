const mongoose = require('mongoose');

const ActivityCategaorySchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
 
    },
     activity: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    // This enables Mongoose to handle the _id field automatically
    _id: true,
  });

const Activity_category = mongoose.model('Activity_category', ActivityCategaorySchema);
module.exports = Activity_category;
