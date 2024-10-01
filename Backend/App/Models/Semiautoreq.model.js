const mongoose = require("mongoose");
const { Schema, model } = require('mongoose');

const dataSchema = Schema(
  {
    postdata: { 
      type: Map, 
      of: String, 
      default: {} 
    },
    filePath: { type: String, default: null },
    signals: {
      DTime: { type: String, default: null },
      Symbol: { type: String, default: null },
      TType: { type: String, default: null },
      Tr_Price: { type: String, default: null },
      Price: { type: String, default: null },
      Sq_Value: { type: String, default: null },
      Sl_Value: { type: String, default: null },
      TSL: { type: String, default: null },
      Segment: { type: String, default: null },
      Strike: { type: String, default: null },
      OType: { type: String, default: null },
      Expiry: { type: String, default: null },
      Strategy: { type: String, default: null },
      Quntity: { type: String, default: null },
      Key: { type: String, default: null },
      TradeType: { type: String, default: null },
      ExitStatus: { type: String, default: null },
      Demo: { type: String, default: null },
    },
    instrument_token: { type: String, default: null },
    signal_req: { type: String, default: null },
    status: { type: String, default: '0' },
    user_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    createDate: { type: Date, default: Date.now },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const semiautoModel = model("semiauto", dataSchema);
module.exports = semiautoModel;
