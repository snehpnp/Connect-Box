"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../../Models");
const User_model = db.user;
const Role_modal = db.role;
var dateTime = require("node-datetime");
var dt = dateTime.create();
const strategyDB = db.Strategies
const serviceGroupName = db.serviceGroupName
const Subadmin_Permission = db.Subadmin_Permission;
const strategy_client = db.strategy_client;




class Employee {

    async GetPermission(req, res) {
        const { id } = req.body;
    
        try {
            if (!id) {
                return res.send({ status: false, msg: "Enter User Id", data: [] });
            }
    
            const findData = await Subadmin_Permission.findOne({ user_id: id });
    
            if (!findData) {
                return res.send({ status: false, msg: "Invalid User Id", data: [] });
            }
    
            const strategies = findData.strategy;
            const matchedStrategies = await strategyDB.aggregate([
                { $match: { _id: { $in: strategies } } },
                { $project: { id: '$_id', strategy_name: 1, _id: 0,Service_Type:1  } }
            ]);
    
            const groupService = findData.group_services;
            const matchedGroupservice = await serviceGroupName.aggregate([
                { $match: { _id: { $in: groupService } } },
                { $project: { id: '$_id', name: 1, _id: 0} }
            ]);

            
    
            return res.send({
                status: true,
                msg: "All data fetched successfully",
                data: findData,
                strategyName: matchedStrategies,
                groupService: matchedGroupservice
            });
        } catch (err) {
            console.log("Error occurred while fetching permissions:", err);
            return res.status(500).send({ status: false, msg: "Internal server error" });
        }
    }

    async GetEmployeeById(req,res){
        try{
            const {id}  = req.body;

            if(!id){
                return res.send({status: false, msg : 'Id is not found', data : []})
            }

            const findData = await User_model.findOne({ _id : id})
            if(!findData){
                return res.send({status:false , msg : 'Incorrect User Id', data : []})
            }

            const findStrategy = await strategy_client.findMany({user_id : id})


        console.log(findStrategy)



        }
        catch{

        }

    }
    
}



module.exports = new Employee();