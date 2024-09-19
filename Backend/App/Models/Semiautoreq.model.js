const mongoose = require("mongoose");
const { Schema, model } = require('mongoose');
// Define the schema for signals and postdata
const dataSchema = Schema(
  {
    postdata: {
      complexty: { type: String, default: null },
      discqty: { type: String, default: null },
      exch: { type: String, default: null },
      pCode: { type: String, default: null },
      prctyp: { type: String, default: null },
      price: { type: String, default: null },
      qty: { type: String, default: null },
      ret: { type: String, default: null },
      symbol_id: { type: String, default: null },
      trading_symbol: { type: String, default: null },
      transtype: { type: String, default: null },
      trigPrice: { type: String, default: null },
      orderTag: { type: String, default: null },
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
