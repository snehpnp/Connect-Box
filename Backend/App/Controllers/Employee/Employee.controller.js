"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../../Models");
const User_model = db.user;
const Role_modal = db.role;
var dateTime = require("node-datetime");
var dt = dateTime.create();
const count_licenses = db.count_licenses;
const researcher_strategy = db.researcher_strategy;
const client_service = db.client_service
const strategyDB = db.Strategies
const Subadmin_Permission = db.Subadmin_Permission;




class Employee {

    async GetPermission(req, res) {
        const { id } = req.body

        try {
            if (!id) {
                return res.send({ status: false, msg: "Enter User Id", data: [] })
            }

            const findData = await Subadmin_Permission.findOne({ user_id: id });

            if (findData) {
                const strategies = findData.strategy;
                let matchedStrategies = [];
                
                const matchedStrategy = await strategyDB.findById(strategies);
                
                console.log("Matched Strategies: ", matchedStrategy);

                // Print the matched strategies
            } else {
                console.log("No data found for the provided user ID");
            }

            if (!findData) {
                return res.send({ status: false, mag: "Invalid User Id", data: [] })
            }

            return res.send({ status: true, msg: 'fetch all permission successfully', data: findData })

        }
        catch (err) {
            console.log("Network error", err)
            return
        }
    }
}



module.exports = new Employee();