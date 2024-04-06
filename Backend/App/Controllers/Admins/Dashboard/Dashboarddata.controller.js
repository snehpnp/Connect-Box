"use strict";
const bcrypt = require("bcrypt");
const db = require("../../../Models");
const User_model = db.user;
const Role_model = db.role;
const SubAdminCompanyInfo = db.SubAdminCompanyInfo;
const count_licenses = db.count_licenses;


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
      
      console.log(dummyData);

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
        dummyData:dummyData
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




      



      return
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

}

module.exports = new Dashboard();
