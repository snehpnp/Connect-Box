const mongoose = require('mongoose');

// Define schema for storing images
const imageSchema = new mongoose.Schema({
  

    profileImage:{
    type: String,
    required: true
  }
});

// Create a model for the image schema
const Image = mongoose.model('ProfileImage', imageSchema);

module.exports = Image;
