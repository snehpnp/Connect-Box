const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },

    segments: {
      type: Array,
      default: null,
    },
    monthlyPrice: {
      type: Number,
      default: null,
    },
    quaterlyPrice: {
      type: Number,
      default: null,
    },
    halfYearlyPrice: {
      type: Number,
      default: null,
    },
    yealryPrice: {
      type: Number,
      default: null,
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    max_trade: {
        type: Number,
        default: null,
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

const Plan = mongoose.model("plan", PlanSchema);
module.exports = Plan;
