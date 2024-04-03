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

 
    async  GetDashboardData(req, res) {
    try {
        const Totalcount = await User_model.countDocuments({ Role: "SUBADMIN" });
        const TotalActivecount = await User_model.countDocuments({ Role: "SUBADMIN", Is_Active: "1" });
        const TotalUsercount = await User_model.countDocuments({ Role: "USER" });
        const TotalActiveUsercount = await User_model.countDocuments({
            Role: "USER",
            Is_Active: "1",
            $or: [
                { End_Date: { $gte: new Date() } }, 
                { End_Date: null } 
            ]
        });
        

        console.log("Total Count:", Totalcount);

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