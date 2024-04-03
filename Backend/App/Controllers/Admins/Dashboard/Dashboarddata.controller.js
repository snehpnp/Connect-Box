"use strict";
const bcrypt = require("bcrypt");
const db = require('../../../Models');
const User_model = db.user;
const Role_model = db.role;
const SubAdminCompanyInfo = db.SubAdminCompanyInfo;


var dateTime = require('node-datetime');
var dt = dateTime.create();

const count_licenses = db.count_licenses;


// Product CLASS
class Dashboard {


    async GetDashboardData(req, res) {
        try {

            const counts = await User_model.aggregate([
                {
                    $facet: {
                        Totalcount: [
                            { $match: { Role: "SUBADMIN" } },
                            { $count: "count" }
                        ],
                        TotalActivecount: [
                            { $match: { Role: "SUBADMIN", Is_Active: "1" } },
                            { $count: "count" }
                        ],
                        TotalUsercount: [
                            { $match: { Role: "USER" } },
                            { $count: "count" }
                        ],
                        TotalActiveUsercount: [
                            {
                                $match: {
                                    Role: "USER",
                                    Is_Active: "1",
                                    $or: [
                                        { End_Date: { $gte: new Date() } },
                                        { End_Date: null }
                                    ]
                                }
                            },
                            { $count: "count" }
                        ]
                    }
                },
                {
                    $project: {
                        Totalcount: { $arrayElemAt: ["$Totalcount.count", 0] },
                        TotalActivecount: { $arrayElemAt: ["$TotalActivecount.count", 0] },
                        TotalUsercount: { $arrayElemAt: ["$TotalUsercount.count", 0] },
                        TotalActiveUsercount: { $arrayElemAt: ["$TotalActiveUsercount.count", 0] }
                    }
                }
            ]);

            const { Totalcount, TotalActivecount, TotalUsercount, TotalActiveUsercount } = counts[0];



            var Count = {
                Totalcount: Totalcount,
                TotalActivecount: TotalActivecount,
                TotalInActivecount: Totalcount - TotalActivecount,

                TotalUsercount: TotalUsercount,
                TotalActiveUsercount: TotalActiveUsercount,
                TotalInActiveUsercount: TotalUsercount - TotalActiveUsercount
            };

            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get Subadmins",
                data: Count
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