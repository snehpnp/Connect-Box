"use strict";
const bcrypt = require("bcrypt");
const db = require("../../Models");
const User_model = db.user;

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const user_logs = db.user_logs;
const Activity_logs = db.Activity_logs;
const Activity_category = db.Activity_category;



// Product CLASS
class ActivityLogs {


    async findActivityCategory(req, res) {
        try {
            const { role } = req.body;
            var findData = {}

            if (role == "SUBADMIN") {
                findData = { $or: [{ role: role }, { role: "USER" }] }
            } else if (role == "ADMIN") {
                findData = { $or: [{ role: role }, { role: "SUBADMIN" }, { role: "RESEARCH" }] }
            } else {
                findData = { role: role }
            }

            const Activity_logs1 = await Activity_category.find(findData);

            // IF DATA NOT EXIST
            if (Activity_logs1.length == 0) {
                return res.send({ status: false, msg: "Empty data", data: [] });
            }

            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Activity Name Find",
                data: Activity_logs1,
            });
        } catch (error) {
            console.log("Error get UserInfo error -", error);
        }
    }




    async findActivity(req, res) {
        try {
            const { id, category } = req.body;
            const Activity_logs1 = await Activity_category.find({ activity: category });

            // IF DATA NOT EXIST
            if (Activity_logs1.length == 0) {
                return res.send({ status: false, msg: "Category Not Found", data: [] });
            }


            if (Activity_logs1[0].activity != "LOGIN" || Activity_logs1[0].activity != "TRADING_STATUS" || Activity_logs1[0].activity != "USER_LOGIN" || Activity_logs1[0].activity != "ADMIN_LOGIN" || Activity_logs1[0].activity != "RESEARCH_LOGIN" || Activity_logs1[0].activity != "EMPLOYEE_LOGIN" || Activity_logs1[0].activity != "RESEARCH_TRADING_STATUS" || Activity_logs1[0].activity != "USER_TRADING_STATUS") {


                const Activity_logs_data = await Activity_logs.aggregate([
                    {
                        $match: { admin_Id: new ObjectId(id), category: category }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user_Id",
                            foreignField: "_id",
                            as: "userData"
                        }
                    },
                    {
                        $unwind: "$userData" // Unwind the userData array
                    },
                    {
                        $project: {
                            "UserName": "$userData.UserName",
                            "category": 1,
                            "admin_Id": 1,
                            "message": 1,
                            "maker_role": 1,
                            "device": 1,
                            "system_ip": 1,
                            "createdAt": 1,

                            _id: 0
                        }
                    }
                ]);


                if (Activity_logs_data.length == 0) {
                    return res.send({ status: false, msg: "Activity  Not Found", data: [] });
                }

                // DATA GET SUCCESSFULLY
                return res.send({
                    status: true,
                    msg: "Activity Name Find",
                    data: Activity_logs_data,
                });
            } else {




                const user_logs_data = await user_logs.aggregate([
                    {
                        $match: { admin_Id: new ObjectId(id)}
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user_Id",
                            foreignField: "_id",
                            as: "userData"
                        }
                    },
                    {
                        $unwind: "$userData" // Unwind the userData array
                    },
                    {
                        $project: {
                            "UserName": "$userData.UserName",
                            "category": 1,
                            "admin_Id": 1,
                            "message": 1,
                            "maker_role": 1,
                            "device": 1,
                            "system_ip": 1,
                            "createdAt": 1,

                            _id: 0
                        }
                    }
                ]);


                if (user_logs_data.length == 0) {
                    return res.send({ status: false, msg: "Activity  Not Found", data: [] });
                }

                // DATA GET SUCCESSFULLY
               return res.send({
                    status: true,
                    msg: "Activity Name Find",
                    data: user_logs_data,
                });
            }











        } catch (error) {
            console.log("Error get UserInfo error -", error);
        }
    }






}

module.exports = new ActivityLogs();
