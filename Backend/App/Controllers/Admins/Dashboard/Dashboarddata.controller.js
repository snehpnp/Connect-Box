"use strict";
const bcrypt = require("bcrypt");
const db = require("../../../Models");
const User_model = db.user;
const Role_model = db.role;
const SubAdminCompanyInfo = db.SubAdminCompanyInfo;
const count_licenses = db.count_licenses;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var dateTime = require("node-datetime");
var dt = dateTime.create();

// Product CLASS
class Dashboard {
  async GetDashboardData(req, res) {
    try {
      const counts = await User_model.aggregate([
        {
          $facet: {
            Totalcount: [{ $match: { Role: "SUBADMIN" } }, { $count: "count" }],
            TotalActivecount: [
              { $match: { Role: "SUBADMIN", ActiveStatus: "1" } },
              { $count: "count" },
            ],
            TotalUsercount: [{ $match: { Role: "RESEARCH" } }, { $count: "count" }],
            TotalActiveUsercount: [
              {
                $match: {
                  Role: "RESEARCH",
                  ActiveStatus: "1",
                  $or: [{ End_Date: { $gte: new Date() } }, { End_Date: null }],
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            Totalcount: { $arrayElemAt: ["$Totalcount.count", 0] },
            TotalActivecount: { $arrayElemAt: ["$TotalActivecount.count", 0] },
            TotalUsercount: { $arrayElemAt: ["$TotalUsercount.count", 0] },
            TotalActiveUsercount: {
              $arrayElemAt: ["$TotalActiveUsercount.count", 0],
            },
          },
        },
      ]);

      const data = await count_licenses.aggregate([
        {
          $addFields: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            balance: { $toDouble: "$Balance" },
          },
        },
        {
          $group: {
            _id: "$date",
            totalBalance: { $sum: "$balance" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

  

  

      const {
        Totalcount,
        TotalActivecount,
        TotalUsercount,
        TotalActiveUsercount,
      } = counts[0];

      var Count = {
        Totalcount: Totalcount,
        TotalActivecount: TotalActivecount,
        TotalInActivecount: Totalcount - TotalActivecount,

        TotalUsercount: TotalUsercount,
        TotalActiveUsercount: TotalActiveUsercount,
        TotalInActiveUsercount: TotalUsercount - TotalActiveUsercount,
       
      };

      // DATA GET SUCCESSFULLY
      res.send({
        status: true,
        msg: "Get Subadmins",
        data: Count,
      });
    } catch (error) {
      console.log("Error getting Subadmins:", error);
      res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }

  async GetDashboardData1(req, res) {
    try {
      const selectedOption = req.body.selectedOption;
      const SUBADMINS = req.body.SUBADMINS;

      let aggregationPipelines = [];

      if (SUBADMINS !== "") {
        // Add a single pipeline for the specified user
        const pipeline = [
          { $match: { user_id: new ObjectId(SUBADMINS) } },
          { $sort: { createdAt: 1 } },
          {
            $addFields: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              balance: { $toDouble: "$Balance" },
            },
          },
          { $group: { _id: "$date", totalBalance: { $sum: "$balance" } } },
        ];

        aggregationPipelines.push(pipeline);
      } else {
        const pipeline = [
          { $sort: { createdAt: 1 } },
          {
            $addFields: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              balance: { $toDouble: "$Balance" },
            },
          },
          { $group: { _id: "$date", totalBalance: { $sum: "$balance" } } },
        ];

        aggregationPipelines.push(pipeline);
      }

      aggregationPipelines.forEach((pipeline) => {
        switch (selectedOption) {
          case "Day":
            pipeline.push({
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: { $toDate: "$_id" },
                  },
                },
                totalBalance: { $sum: "$totalBalance" },
              },
            });
            break;
          case "Monthly":
            pipeline.push({
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m", date: { $toDate: "$_id" } },
                },
                totalBalance: { $sum: "$totalBalance" },
              },
            });
            break;
          case "Yearly":
            pipeline.push({
              $group: {
                _id: {
                  $dateToString: { format: "%Y", date: { $toDate: "$_id" } },
                },
                totalBalance: { $sum: "$totalBalance" },
              },
            });
            break;
          case "Quarterly":
            pipeline.push({
              $group: {
                _id: {
                  $concat: [
                    { $substr: [{ $year: { $toDate: "$_id" } }, 0, -1] },
                    "-Q",
                    {
                      $cond: [
                        { $lte: [{ $month: { $toDate: "$_id" } }, 3] },
                        "1",
                        {
                          $cond: [
                            { $lte: [{ $month: { $toDate: "$_id" } }, 6] },
                            "2",
                            {
                              $cond: [
                                { $lte: [{ $month: { $toDate: "$_id" } }, 9] },
                                "3",
                                "4",
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                totalBalance: { $sum: "$totalBalance" },
              },
            });
            break;
          case "Half-Yearly":
            pipeline.push({
              $group: {
                _id: {
                  $concat: [
                    { $substr: [{ $year: { $toDate: "$_id" } }, 0, -1] },
                    "-HY",
                    {
                      $cond: [
                        { $lte: [{ $month: { $toDate: "$_id" } }, 6] },
                        "1",
                        "2",
                      ],
                    },
                  ],
                },
                totalBalance: { $sum: "$totalBalance" },
              },
            });
            break;
        }
      });

      let results = [];
      for (let pipeline of aggregationPipelines) {
        var data = await count_licenses.aggregate(pipeline);
        results.push(data);
      }

      let sortedResults = [];
      results.forEach((data) => {
        sortedResults.push(
          data.sort((a, b) => {
            const dateA = new Date(a._id);
            const dateB = new Date(b._id);
            return dateA - dateB;
          })
        );
      });

      const dummyData = { categories: [], data: [] };
      sortedResults.forEach((item) => {
        item.forEach((data) => {
          dummyData.categories.push(data._id);
          dummyData.data.push(parseInt(data.totalBalance));
        });
      });

      res.send({
        status: true,
        msg: "Get Subadmins",
        data: dummyData,
      });
    } catch (error) {
      console.log("Error getting Subadmins:", error);
      res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }
}

module.exports = new Dashboard();
