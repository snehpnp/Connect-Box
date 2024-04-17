"use strict";
const db = require("../../../Models");
const User_model = db.user;

var dateTime = require("node-datetime");
var dt = dateTime.create();

class Dashboard_Subadmin_Data {
  async GetDashboardData(req, res) {
    try {
      const { subadminId } = req.body;
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
              { $match: { ActiveStatus: "0" } },
              { $count: "count" },
            ],
            TotalLiveUsercount: [
              { $match: { license_type: "2" } },
              { $count: "count" },
            ],
            TotalActiveLiveUsercount: [
              { $match: { Is_Active: "1", license_type: "2" } },
              { $count: "count" },
            ],
            TotalExpiredLiveUsercount: [
              { $match: { Is_Active: "0", license_type: "2" } },
              { $count: "count" },
            ],
            TotalTodayUsercount: [
              { $match: { license_type: "0" } },
              { $count: "count" },
            ],
            TotalActiveTodayUsercount: [
              {
                $match: {
                  Is_Active: "1",
                  license_type: "0",
                  CreatedAt: { $gte: today },
                },
              },
              { $count: "count" },
            ],

            TotalExpiredTodayUsercount: [
              {
                $match: {
                  ActiveStatus: "0",
                  license_type: "2",
                  CreatedAt: { $gte: today },
                },
              },
              { $count: "count" },
            ],
            TotalDemoUsercount: [
              { $match: { license_type: "1" } },
              { $count: "count" },
            ],
            TotalActiveDemoUsercount: [
              { $match: { license_type: "1", ActiveStatus: "1" } },
              { $count: "count" },
            ],
            TotalExpiredDemoUsercount: [
              { $match: { license_type: "1", ActiveStatus: "0" } },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            TotalUsercount: {
              $ifNull: [{ $arrayElemAt: ["$TotalUsercount.count", 0] }, 0],
            },
            TotalActiveUsercount: {
              $ifNull: [
                { $arrayElemAt: ["$TotalActiveUsercount.count", 0] },
                0,
              ],
            },
            TotalExpiredUsercount: {
              $ifNull: [
                { $arrayElemAt: ["$TotalExpiredUsercount.count", 0] },
                0,
              ],
            },
            TotalLiveUsercount: {
              $ifNull: [{ $arrayElemAt: ["$TotalLiveUsercount.count", 0] }, 0],
            },
            TotalActiveLiveUsercount: {
              $ifNull: [
                { $arrayElemAt: ["$TotalActiveLiveUsercount.count", 0] },
                0,
              ],
            },
            TotalExpiredLiveUsercount: {
              $ifNull: [
                { $arrayElemAt: ["$TotalExpiredLiveUsercount.count", 0] },
                0,
              ],
            },
            TotalTodayUsercount: {
              $ifNull: [{ $arrayElemAt: ["$TotalTodayUsercount.count", 0] }, 0],
            },
            TotalActiveTodayUsercount: {
              $ifNull: [
                { $arrayElemAt: ["$TotalActiveTodayUsercount.count", 0] },
                0,
              ],
            },
            TotalExpiredTodayUsercount: {
              $ifNull: [
                { $arrayElemAt: ["$TotalExpiredTodayUsercount.count", 0] },
                0,
              ],
            },
            TotalDemoUsercount: {
              $ifNull: [{ $arrayElemAt: ["$TotalDemoUsercount.count", 0] }, 0],
            },
            TotalActiveDemoUsercount: {
              $ifNull: [
                { $arrayElemAt: ["$TotalActiveDemoUsercount.count", 0] },
                0,
              ],
            },
            TotalExpiredDemoUsercount: {
              $ifNull: [
                { $arrayElemAt: ["$TotalExpiredDemoUsercount.count", 0] },
                0,
              ],
            },
          },
        },
      ]);

      const Count = counts[0];

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
