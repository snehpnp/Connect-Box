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
            TotalUsercount: [{ $match: { Role: "USER" } }, { $count: "count" }],
            TotalActiveUsercount: [
              {
                $match: {
                  Role: "USER",
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
            balance: { $toDouble: "$Balance" }
          }
        },
        {
          $group: {
            _id: "$date",
            totalBalance: { $sum: "$balance" }
          }
        },
        {
          $sort: { _id: 1 } // Sort by date in ascending order
        }
      ]);





      const dummyData = {
        categories: [],
        data: []
      };

      // Assuming your data array is named 'responseData'
      data.forEach(item => {
        dummyData.categories.push(item._id); // Extracting the year from createdAt field
        dummyData.data.push(parseInt(item.totalBalance)); // Converting Balance to integer and pushing to data array
      });


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
        dummyData: dummyData

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

        let aggregationPipeline = [];

        if (SUBADMINS) {
          console.log("SUBADMINS", SUBADMINS);

          aggregationPipeline.push({
              $match: {
                  user_id: new ObjectId(SUBADMINS)
              }
          });
      }

        // Sort data by createdAt field in ascending order
        aggregationPipeline.push({ $sort: { createdAt: 1 } });

        // Add fields and group stage for common operations
        aggregationPipeline.push(
            {
                $addFields: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    balance: { $toDouble: "$Balance" }
                }
            },
            {
                $group: {
                    _id: "$date",
                    totalBalance: { $sum: "$balance" }
                }
            }
        );

        // Assuming 'user_id' is the correct field name, modify the filter stage accordingly
      

        // Modify aggregation pipeline based on selected option
        switch (selectedOption) {
            case "Monthly":
                // Group by month and year
                aggregationPipeline.push(
                    {
                        $group: {
                            _id: { $dateToString: { format: "%Y-%m", date: { $toDate: "$_id" } } },
                            totalBalance: { $sum: "$totalBalance" }
                        }
                    }
                );
                break;
            case "Yearly":
                // Group by year
                aggregationPipeline.push(
                    {
                        $group: {
                            _id: { $dateToString: { format: "%Y", date: { $toDate: "$_id" } } },
                            totalBalance: { $sum: "$totalBalance" }
                        }
                    }
                );
                break;
            case "Quarterly":
                // Group by quarter and year
                aggregationPipeline.push(
                    {
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
                                                            "4"
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            totalBalance: { $sum: "$totalBalance" }
                        }
                    }
                );
                break;

            case "Half-Yearly":
                // Group by half-year intervals
                aggregationPipeline.push(
                    {
                        $group: {
                            _id: {
                                $concat: [
                                    { $substr: [{ $year: { $toDate: "$_id" } }, 0, -1] },
                                    "-HY",
                                    { $cond: [{ $lte: [{ $month: { $toDate: "$_id" } }, 6] }, "1", "2"] }
                                ]
                            },
                            totalBalance: { $sum: "$totalBalance" }
                        }
                    }
                );
                break;
            // Case for "Day" remains unchanged
        }

        // Execute the aggregation pipeline
        let data = await count_licenses.aggregate(aggregationPipeline);

        // Sort the data based on the _id field (date)
        data.sort((a, b) => {
            // Convert _id values to Date objects
            const dateA = new Date(a._id);
            const dateB = new Date(b._id);

            // Compare the dates
            return dateA - dateB;
        });


        const dummyData = {
            categories: [],
            data: []
        };

        // Assuming your data array is named 'responseData'
        data.forEach(item => {
            dummyData.categories.push(item._id); // Extracting the year from createdAt field
            dummyData.data.push(parseInt(item.totalBalance)); // Converting Balance to integer and pushing to data array
        });

        // DATA GET
        res.send({
            status: true,
            msg: "Get Subadmins",
            data: dummyData,
        });
    } catch (error) {
        console.log("Error getting Subadmins:", error);
        res.status(500).send({
            status: false,
            msg: "Internal Server Error"
        });
    }
}



}

module.exports = new Dashboard();
