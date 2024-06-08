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
          { $match: { user_id: new ObjectId(SUBADMINS), Role: "SUBADMIN" } },
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
          { $match: { Role: "SUBADMIN" } },
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

  // TOP 5 SUBADMIN
  async dashboardtopsubadmins(req, res) {
    try {
      const selectedOption = req.body.selectedOption;

      function getDateRange(frequency) {
        let startDate, endDate;
        const today = new Date();

        switch (frequency) {
          case 'Monthly':
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            endDate = today;
            break;
          case 'Quarterly':
            const quarter = Math.floor((today.getMonth() + 3) / 3); // Current quarter
            startDate = new Date(today.getFullYear(), (quarter - 1) * 3, 1);
            endDate = today;
            break;
          case 'Half-Yearly':
            startDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
            endDate = today;
            break;
          case 'Yearly':
            startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
            endDate = today;
            break;
          case 'Day':
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Next day
            break;
          default:
            startDate = null;
            endDate = null;
            break;
        }

        return { startDate, endDate };
      }


      var dateData = getDateRange(selectedOption)

      let topSubadmins = await User_model.aggregate([
        { $match: { Role: "SUBADMIN" } },
        {
          $lookup: {
            from: "count_licenses",
            localField: "_id",
            foreignField: "user_id",
            as: "licenses"
          }
        },
        {
          $project: {
            UserName: 1, // Include UserName field
            licenses: {
              $filter: {
                input: "$licenses",
                as: "license",
                cond: {
                  $and: [
                    { $gte: ["$$license.createdAt", dateData.startDate] },
                    { $lte: ["$$license.createdAt", dateData.endDate] }
                  ]
                }
              }
            }
          }
        },
        { $unwind: "$licenses" },
        {
          $addFields: {
            "licenses.Balance": { $toInt: "$licenses.Balance" } // Convert Balance field from string to number
          }
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$UserName" },
            totalBalance: { $sum: "$licenses.Balance" }, // Calculate individual balance
          }
        },
        {
          $sort: { totalBalance: -1 } // Sort by totalBalance in descending order
        },
      ]);


      const overallTotal = topSubadmins.reduce((acc, obj) => acc + obj.totalBalance, 0);


      const updatedResult = topSubadmins.map(user => ({
        name: user.name,
        percentage: (Math.round((user.totalBalance / overallTotal) * 10000) / 100)

      }))

 
      // Starting ke 5 items ko nikal lo
      const top5 = updatedResult.slice(0, 5);
      
      // Baaki items ko le lo jo 6th position se aage hain
      const remaining = updatedResult.slice(5);
      
      // Calculate total percentage for "Other"
      const otherPercentage = remaining.reduce((sum, item) => sum + item.percentage, 0);
      
      // Create "Other" object
      const other = { name: 'Other', percentage: otherPercentage };
      
      // Final result
      const finalResult = [...top5, other];
      
      

      return res.send({
        status: true,
        msg: "Get Subadmins",
        data: finalResult,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        msg: "Internal Server Error",
      });
    }
  }

}

module.exports = new Dashboard();
