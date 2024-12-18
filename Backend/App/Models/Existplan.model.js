const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    id: {
      type: String,

      required: true,

      unique: true,
    },

    name: {
      type: String,

      required: true,

      unique: true,
    },

    createdAt: {
      type: Date,

      default: Date.now,
    },
  },
  {
    // This enables Mongoose to handle the _id field automatically

    _id: true,
  }
);

const existplan = mongoose.model("existplan", PlanSchema);

module.exports = existplan;
