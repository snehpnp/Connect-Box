const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const FAQMsg = new mongoose.Schema({
    Question:{
        type: String,
        Required: true,

    },
    Answer:{
        type: String,
        Required: true,

    },
    Role:{
        type: String,
        Required: true,
    }
    

});

const FAQMessage = mongoose.model("FAQ", FAQMsg);
module.exports = FAQMessage;
