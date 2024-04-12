"use strict";
const db = require("../../../Models");
const User_model = db.user;


var dateTime = require("node-datetime");
var dt = dateTime.create();

class Dashboard_Subadmin_Data {
  async GetDashboardData(req, res) {
    try {
      const {subadminId} = req.body;
      console.log("subadminId",req.body);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const counts = await User_model.aggregate([
        {
          $match: { parent_id: subadminId },
        },
        {
          $facet: {
            TotalUsercount: [{ $count: "count" }],
            TotalActiveUsercount: [
              { $match: { ActiveStatus: "1" } },
              { $count: "count" },
            ],
            TotalExpiredUsercount: [
              { $match: { End_Date: null } },
              { $count: "count" },
            ],

            TotalLiveUsercount: [
              { $match: { Type: "Live" } },
              { $count: "count" },
            ],
            TotalActiveLiveUsercount: [
              { $match: { ActiveStatus: "1", Type: "Live" } },
              { $count: "count" },
            ],
            TotalExpiredLiveUsercount: [
              { $match: { ActiveStatus: "0", Type: "Live" } },
              { $count: "count" },
            ],

            TotalTodayUsercount: [
              { $match: { CreatedAt: { $gte: today } } },
              { $count: "count" },
            ],
            TotalActiveTodayUsercount: [
              { $match: { ActiveStatus: "1", CreatedAt: { $gte: today } } },
              { $count: "count" },
            ],
            TotalConvertedTodayUsercount: [
              { $match: { Converted: true, CreatedAt: { $gte: today } } },
              { $count: "count" },
            ],
            TotalExpiredTodayUsercount: [
              { $match: { ActiveStatus: "0", CreatedAt: { $gte: today } } },
              { $count: "count" },
            ],

            TotalDemoUsercount: [
              { $match: { Type: "license_type" } },
              { $count: "count" },
            ],
            TotalActiveDemoUsercount: [
              { $match: { license_type: "1", Type: "license_type" } },
              { $count: "count" },
            ],
            TotalExpiredDemoUsercount: [
              { $match: { license_type: "0", Type: "Demo" } },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            TotalUsercount: { $arrayElemAt: ["$TotalUsercount.count", 0] },
            TotalActiveUsercount: {
              $arrayElemAt: ["$TotalActiveUsercount.count", 0],
            },
            TotalExpiredUsercount: {
              $arrayElemAt: ["$TotalExpiredUsercount.count", 0],
            },

            TotalLiveUsercount: {
              $arrayElemAt: ["$TotalLiveUsercount.count", 0],
            },
            TotalActiveLiveUsercount: {
              $arrayElemAt: ["$TotalActiveLiveUsercount.count", 0],
            },
            TotalExpiredLiveUsercount: {
              $arrayElemAt: ["$TotalExpiredLiveUsercount.count", 0],
            },

            TotalTodayUsercount: {
              $arrayElemAt: ["$TotalTodayUsercount.count", 0],
            },
            TotalActiveTodayUsercount: {
              $arrayElemAt: ["$TotalActiveTodayUsercount.count", 0],
            },
            TotalConvertedTodayUsercount: {
              $arrayElemAt: ["$TotalConvertedTodayUsercount.count", 0],
            },
            TotalExpiredTodayUsercount: {
              $arrayElemAt: ["$TotalExpiredTodayUsercount.count", 0],
            },

            TotalDemoUsercount: {
              $arrayElemAt: ["$TotalDemoUsercount.count", 0],
            },
            TotalActiveDemoUsercount: {
              $arrayElemAt: ["$TotalActiveDemoUsercount.count", 0],
            },
            TotalExpiredDemoUsercount: {
              $arrayElemAt: ["$TotalExpiredDemoUsercount.count", 0],
            },
          },
        },
      ]);

      const Count = counts[0];

      console.log("Count",Count)
      res.send({
        status: true,
        msg: "Dashboard Data Retrieved Successfully",
        data: Count,
      });
    } catch (error) {
      console.log("Error retrieving dashboard data:", error);
      res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
}
module.exports = new Dashboard_Subadmin_Data();
