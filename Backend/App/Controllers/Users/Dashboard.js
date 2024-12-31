"use strict";
const db = require("../../Models");
const Signals_modal = db.Signals;
const client_services = db.client_service;
const Strategies = db.Strategies;
const user_modal = db.user;

const strategy_client = db.strategy_client;
const TradePermissionLogs = db.TradePermissionLogs;

const MainSignals = db.MainSignals;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class Dashboard {
  // GET ADMIN SIGNALS
  async UserDashboardData(req, res) {
    try {
      const { id } = req.body;

      // Fetch parent_id of the user
      const user = await user_modal.findById(id).select("parent_id");
      if (!user) {
        return res.status(404).json({ status: false, msg: "User not found" });
      }
      const parent_id = user.parent_id;

      // Get total strategy count for the parent user
      const TotalStrategyCount = await Strategies.countDocuments({
        maker_id: parent_id,
      });

      // Get counts for the logged-in user's strategies
      const YourStrategies = await strategy_client.countDocuments({
        user_id: id,
      });
      const YourActiveStrategies = await strategy_client.countDocuments({
        user_id: id,
        ActiveStatus: "1",
      });
      const YourInActiveStrategies = await strategy_client.countDocuments({
        user_id: id,
        ActiveStatus: "0",
      });

      // Get latest strategies for the parent user
      const Latest_Strategies = await Strategies.find({ maker_id: parent_id })
        .sort({ createdAt: -1 })
        .select("strategy_name strategy_segment createdAt strategy_image")
        .limit(5);

      // Get the most ordered strategy
      const mostOrderedStrategyResult = await strategy_client.aggregate([
        {
          $group: {
            _id: "$strategy_id",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 1,
        },
        {
          $lookup: {
            from: "strategies",
            localField: "_id",
            foreignField: "_id",
            as: "strategy",
          },
        },
        {
          $unwind: "$strategy",
        },
        {
          $project: {
            _id: 0,
            strategy_name: "$strategy.strategy_name",
            plan: "$strategy.security_fund_early",

            count: 1,
          },
        },
      ]);

      const monthlyResult = await MainSignals.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
            },
            entry_type: { $nin: [null, "", undefined] },
            exit_type: { $nin: [null, "", undefined] },
          },
        },
        {
          $group: {
            _id: "$strategy",
            totalSignals: { $sum: 1 },
            totalEntryPrice: {
              $sum: { $toDouble: "$entry_price" },
            },
            totalExitPrice: {
              $sum: { $toDouble: "$exit_price" },
            },
          },
        },
        {
          $project: {
            _id: 1,
            totalSignals: 1,
            totalEntryPrice: 1,
            totalExitPrice: 1,
            totalDifference: {
              $subtract: ["$totalExitPrice", "$totalEntryPrice"],
            },
          },
        },
        {
          $sort: { totalDifference: -1 },
        },
        {
          $limit: 3,
        },
      ]);

      const weeklyResult = await MainSignals.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Last 7 days
            },
            entry_type: { $nin: [null, "", undefined] },
            exit_type: { $nin: [null, "", undefined] },
          },
        },
        {
          $group: {
            _id: "$strategy",
            totalSignals: { $sum: 1 },
            totalEntryPrice: {
              $sum: { $toDouble: "$entry_price" },
            },
            totalExitPrice: {
              $sum: { $toDouble: "$exit_price" },
            },
          },
        },
        {
          $project: {
            _id: 1,
            totalSignals: 1,
            totalEntryPrice: 1,
            totalExitPrice: 1,
            totalDifference: {
              $subtract: ["$totalExitPrice", "$totalEntryPrice"],
            },
          },
        },
        {
          $sort: { totalDifference: -1 },
        },
        {
          $limit: 3,
        },
      ]);

      const today = new Date();
      let yesterdayStart;

      // Check if today is Sunday (0) or Saturday (6)
      if (today.getDay() === 0) {
        // If today is Sunday, set to last Friday
        yesterdayStart = new Date();
        yesterdayStart.setDate(today.getDate() - 2); // Move back to Friday
      } else if (today.getDay() === 6) {
        // If today is Saturday, set to last Friday
        yesterdayStart = new Date();
        yesterdayStart.setDate(today.getDate() - 1); // Move back to Friday
      } else {
        // Otherwise, just set to yesterday
        yesterdayStart = new Date();
        yesterdayStart.setDate(today.getDate() - 1);
      }

      yesterdayStart.setHours(0, 0, 0, 0); // Set to midnight

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0); // Start of today (midnight)

      const dailyResult = await MainSignals.aggregate([
        {
          $match: {
            createdAt: {
              $gte: yesterdayStart, // Start of Friday (if weekend) or yesterday
              $lt: todayStart, // Start of today (exclusive)
            },
            entry_type: { $nin: [null, "", undefined] },
            exit_type: { $nin: [null, "", undefined] },
          },
        },
        {
          $group: {
            _id: "$strategy",
            totalSignals: { $sum: 1 },
            totalEntryPrice: {
              $sum: { $toDouble: "$entry_price" },
            },
            totalExitPrice: {
              $sum: { $toDouble: "$exit_price" },
            },
          },
        },
        {
          $project: {
            _id: 1,
            totalSignals: 1,
            totalEntryPrice: 1,
            totalExitPrice: 1,
            totalDifference: {
              $subtract: ["$totalExitPrice", "$totalEntryPrice"],
            },
          },
        },
        {
          $sort: { totalDifference: -1 },
        },
        {
          $limit: 3,
        },
      ]);

      const mostOrderedStrategy =
        mostOrderedStrategyResult.length > 0
          ? mostOrderedStrategyResult[0]
          : null;

      // Combine all data into a single object
      const data = {
        StrategyCount: {
          TotalStrategyCount,
          YourStrategies,
          YourActiveStrategies,
          YourInActiveStrategies,
        },
        Latest_Strategies,
        mostOrderedStrategy,
        monthlyResult,
        weeklyResult,
        dailyResult,
      };

      return res.json({ status: true, data, msg: "Done" });
    } catch (error) {
      console.log("Error:", error);
      return res
        .status(500)
        .json({ status: false, msg: "Internal server error" });
    }
  }

  async GetTradePermission(req, res) {
    try {
      const { id } = req.body;
      const user = await user_modal.findById(id).select("tradepermission");
      if (!user) {
        return res.status(404).json({ status: false, msg: "User not found" });
      }
      return res.json({
        status: true,
        data: user.tradepermission,
        msg: "Done",
      });
    } catch (error) {
      console.log("Error:", error);
      return res
        .status(500)
        .json({ status: false, msg: "Internal server error" });
    }
  }

  async UpdateTradePermission(req, res) {
    try {
      const { id, permission } = req.body;
      const user = await user_modal.findById(id);
      if (!user) {
        return res.status(404).json({ status: false, msg: "User not found" });
      }
      user.tradepermission = permission;
      await user.save();

      // Save the log
      const log = new TradePermissionLogs({
        user_id: id,
        msg: `Trade permission updated to ${
          permission == 1 ? "Semi Auto" : "Full Auto"
        }`,
      });
      await log.save();

      return res.json({ status: true, msg: "Trade permission updated" });
    } catch (error) {
      console.log("Error:", error);
      return res
        .status(500)
        .json({ status: false, msg: "Internal server error" });
    }
  }

  async GetTradePermissionLogs(req, res) {
    try {
      const { id } = req.body;
      const logs = await TradePermissionLogs.find({ user_id: id }).sort({
        createdAt: -1,
      });
      return res.json({ status: true, data: logs, msg: "Done" });
    } catch (error) {
      console.log("Error:", error);
      return res
        .status(500)
        .json({ status: false, msg: "Internal server error" });
    }
  }
}

module.exports = new Dashboard();
