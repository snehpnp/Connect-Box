"use strict";
const db = require("../../../Models");
const User_model = db.user;
const strategy_transaction = db.strategy_transaction;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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
          $match: { parent_id: subadminId ,Role:"USER"},
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
              { $match: { ActiveStatus: "1", license_type: "2" } },
              { $count: "count" },
            ],
            TotalExpiredLiveUsercount: [
              { $match: { ActiveStatus: "0", license_type: "2" } },
              { $count: "count" },
            ],
            TotalTodayUsercount: [
              { $match: { license_type: "0" } },
              { $count: "count" },
            ],
            TotalActiveTodayUsercount: [
              {
                $match: {
                  ActiveStatus: "1",
                  license_type: "0",
                },
              },
              { $count: "count" },
            ],

            TotalExpiredTodayUsercount: [
              {
                $match: {
                  ActiveStatus: "0",
                  license_type: "0",
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




  async DashboardChartData(req, res) {
    try {
      const selectedOption = req.body.selectedOption;
      const { user_ID } = req.body;

      if (!user_ID) {
        return res.status(400).send({
          status: false,
          msg: "Please enter a valid Sub Admin Id",
          data: [],
        });
      }

      const matchStage = {
        $match: {
          parent_id: user_ID,
          Role:"USER"
        },
      };

      let groupFormat;
      switch (selectedOption) {
        case "Day":
          groupFormat = "%Y-%m-%d";
          break;
        case "Monthly":
          groupFormat = "%Y-%m";
          break;
        case "Yearly":
          groupFormat = "%Y";
          break;
        case "Quarterly":
          groupFormat = {
            $concat: [
              { $substr: [{ $year: "$Create_Date" }, 0, -1] },
              "-Q",
              {
                $cond: [
                  { $lte: [{ $month: "$Create_Date" }, 3] },
                  "1",
                  {
                    $cond: [
                      { $lte: [{ $month: "$Create_Date" }, 6] },
                      "2",
                      {
                        $cond: [
                          { $lte: [{ $month: "$Create_Date" }, 9] },
                          "3",
                          "4",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          };
          break;
        case "Half-Yearly":
          groupFormat = {
            $concat: [
              { $substr: [{ $year: "$Create_Date" }, 0, -1] },
              "-HY",
              { $cond: [{ $lte: [{ $month: "$Create_Date" }, 6] }, "1", "2"] },
            ],
          };
          break;
        default:
          groupFormat = "%Y-%m-%d";
      }

      const pipeline = [
        matchStage,
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: groupFormat, date: "$Create_Date" },
              },
            },
            users: { $push: "$UserName" },
            userCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id.date",
            users: 1,
            userCount: 1,
          },
        },
        {
          $sort: { date: 1 },
        },
      ];

      const results = await User_model.aggregate(pipeline);

      const dummyData = {
        categories: [],
        data: [],
        userCounts: [],
      };

      results.forEach((item) => {
        dummyData.categories.push(item.date);
        dummyData.data.push(item.users);
        dummyData.userCounts.push(item.userCount);
      });

      return res.send({
        status: true,
        msg: "Data retrieved successfully",
        data: dummyData,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
      res.status(500).send({
        status: false,
        msg: "Error fetching data",
        data: [],
      });
    }
  }


  
  async DashboardBalanceData(req, res) {
    try {
      const selectedOption = req.body.selectedOption;
      const { user_ID } = req.body;

      if (!user_ID) {
        return res.status(400).send({
          status: false,
          msg: "Please enter a valid Sub Admin Id",
          data: [],
        });
      }
      const obJUserId = new ObjectId(user_ID);

      const matchStage = {
        $match: {
          admin_id: obJUserId,
        },
      };

      let groupFormat;
      switch (selectedOption) {
        case "Day":
          groupFormat = "%Y-%m-%d";
          break;
        case "Monthly":
          groupFormat = "%Y-%m";
          break;
        case "Yearly":
          groupFormat = "%Y";
          break;
        case "Quarterly":
          groupFormat = {
            $concat: [
              { $substr: [{ $year: "$createdAt" }, 0, -1] },
              "-Q",
              {
                $cond: [
                  { $lte: [{ $month: "$createdAt" }, 3] },
                  "1",
                  {
                    $cond: [
                      { $lte: [{ $month: "$createdAt" }, 6] },
                      "2",
                      {
                        $cond: [
                          { $lte: [{ $month: "$createdAt" }, 9] },
                          "3",
                          "4",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          };
          break;
        case "Half-Yearly":
          groupFormat = {
            $concat: [
              { $substr: [{ $year: "$createdAt" }, 0, -1] },
              "-HY",
              { $cond: [{ $lte: [{ $month: "$createdAt" }, 6] }, "1", "2"] },
            ],
          };
          break;
        default:
          groupFormat = "%Y-%m-%d";
      }

      const pipeline = [
        matchStage,
        {
          $addFields: {
            converted_stg_charge: { $toDouble: "$stg_charge" },
          },
        },
        {
          $group: {
            _id: null,
            strategy_transactions: { $push: "$converted_stg_charge" },
            date: {
              $addToSet: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
            },
            Totalcount: { $sum: "$converted_stg_charge" },
          },
        },
        {
          $project: {
            _id: 0,
            strategy_transactions: 1,
            Totalcount: 1,
            date: 1,
          },
        },
      ];

      const results = await strategy_transaction.aggregate(pipeline);


      // const dummyData = {
      //   categories:results.,
      //   data: [],
      //   userCounts: [],
      // };

      // results.forEach((item) => {
      //   dummyData.categories.push(item.data.date);
      //   dummyData.data.push(item.data);
      //   dummyData.userCounts.push(item.data.strategy_transactions);
      // });
      res.send({
        status: true,
        msg: "Data retrieved successfully",
        data: results,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
      res.status(500).send({
        status: false,
        msg: "Error fetching data",
        data: [],
      });
    }
  }








// EMPLOYEE DASHBOARD
async EmployeeDashboardData(req, res) {
  try {
    const { subadminId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const counts = await User_model.aggregate([
      {
        $match: { employee_id: subadminId ,Role:"USER"},
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
            { $match: { ActiveStatus: "1", license_type: "2" } },
            { $count: "count" },
          ],
          TotalExpiredLiveUsercount: [
            { $match: { ActiveStatus: "0", license_type: "2" } },
            { $count: "count" },
          ],
          TotalTodayUsercount: [
            { $match: { license_type: "0" } },
            { $count: "count" },
          ],
          TotalActiveTodayUsercount: [
            {
              $match: {
                ActiveStatus: "1",
                license_type: "0",
              },
            },
            { $count: "count" },
          ],

          TotalExpiredTodayUsercount: [
            {
              $match: {
                ActiveStatus: "0",
                license_type: "0",
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
