"use strict";
const bcrypt = require("bcrypt");
const db = require('../../../Models');
const User_model = db.user;
const Role_model = db.role;
var dateTime = require('node-datetime');
var dt = dateTime.create();

const count_licenses = db.count_licenses;

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Product CLASS
class Subadmin {

    // ADD SUBAMDIN
    async AddSubadmin(req, res) {
        try {
            const { profile_img, FullName, Email, PhoneNo, password, prifix_key, subadmin_service_type, strategy_Percentage, Per_trade, parent_id, parent_role, Balance } = req.body;
    
            const Role = "SUBADMIN";
    
            // Check if role exists
            const roleCheck = await Role_model.findOne({ name: Role.toUpperCase() });
            if (!roleCheck) {
                return res.status(400).send({ status: false, msg: 'Role does not exist' });
            }
    
            // Check if username, email, phone number, and prefix key already exist
            const existingUsername = await User_model.findOne({ UserName: FullName + PhoneNo.slice(-4), prifix_key: prifix_key });
            if (existingUsername) {
                return res.status(400).send({ status: false, msg: 'Username already exists' });
            }
    
            const existingEmail = await User_model.findOne({ Email: Email, prifix_key: prifix_key });
            if (existingEmail) {
                return res.status(400).send({ status: false, msg: 'Email already exists' });
            }
    
            const existingPhone = await User_model.findOne({ PhoneNo: PhoneNo, prifix_key: prifix_key });
            if (existingPhone) {
                return res.status(400).send({ status: false, msg: 'Phone number already exists' });
            }
    
            const existingPrefix = await User_model.findOne({ Role: "SUBADMIN", prifix_key: prifix_key });
            if (existingPrefix) {
                return res.status(400).send({ status: false, msg: 'Prefix key already exists' });
            }
    
            // Generate hashed password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password.toString(), salt);
    
            // Generate client key
            const mins = 1;
            const maxs = 1000000;
            const randNum = mins + Math.random() * (maxs - mins);
            const cli_key = Math.round(randNum);
            const ccd = dt.format('ymd');
            const client_key = prifix_key + cli_key + ccd;
    
            // Create new user instance
            const newUser = new User_model({
                profile_img: profile_img ? profile_img : "",
                FullName: FullName + PhoneNo.slice(-4),
                UserName: FullName,
                Email: Email,
                PhoneNo: PhoneNo,
                Password: hashedPassword,
                Otp: password,
                Role: Role.toUpperCase(),
                prifix_key: prifix_key.toUpperCase(),
                client_key: client_key,
                parent_role: parent_role,
                parent_id: parent_id,
                Is_First_login: "1",
                subadmin_service_type: subadmin_service_type,
                strategy_Percentage: strategy_Percentage,
                Per_trade: Per_trade,
                Balance: Balance
            });
    
            console.log("newUse,newUserr")
            // Save new user and count licenses
            const savedUser = await newUser.save();
            const count_licenses_add = new count_licenses({
                user_id: savedUser.user_id,
                Role: "SUBADMIN",
                admin_id: parent_id,
                Balance: Balance
            });
            await count_licenses_add.save();
    
            return res.status(200).send({ status: true, msg: "Successfully added!", data: { UserId: savedUser.user_id } });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ msg: "Internal server error", error: error });
        }
    }
    
    // EDIT SUBADMIN
    async EditSubadmin(req, res) {
        try {
            const { id, profile_img, FullName, Email, PhoneNo, password, subadmin_service_type, strategy_Percentage, Per_trade, parent_id, parent_role, Balance } = req.body;

            var Total_Balance = 0

            // IF USER ALEARDY EXIST
            const existingUsername = await User_model.findOne({ _id: id });
            if (!existingUsername) {
                return res.send({ status: false, msg: 'User Not exists', data: [] });
            }


            const salt = await bcrypt.genSalt(10);
            var ByCryptrand_password = await bcrypt.hash(password.toString(), salt);


            Total_Balance = Number(existingUsername.Balance) + Number(Balance)

            const count_licenses_add = new count_licenses({
                user_id: existingUsername._id,
                license: Number(Balance),
                Role: "SUBADMIN",
                admin_id: parent_id
            });
            count_licenses_add.save();

            console.log("Total_Balance", Total_Balance)

            // Company Information
            const User = {
                profile_img: profile_img,
                FullName: FullName,
                Password: ByCryptrand_password,
                Otp: password,
                Balance: Number(Total_Balance),
                strategy_Percentage: strategy_Percentage,
                Per_trade: Per_trade
            };

            let subadminUpdate = await User_model.findByIdAndUpdate(existingUsername._id, User)

            return res.send({ status: true, msg: "successfully Edit!", data: [] })


        }
        catch (error) {
            res.send({ msg: "Error=>", error })
        }

    }

    async getallSubadmin(req, res) {
        try {

            // GET LOGIN CLIENTS
            const getAllSubAdmins = await User_model.find({
                Role: "SUBADMIN"
            });
            const totalCount = getAllSubAdmins.length;

            // IF DATA NOT EXIST
            if (getAllSubAdmins.length == 0) {
                return res.send({ status: false, msg: "Empty data", data: [], totalCount: totalCount, })
            }

            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get All Subadmins",
                data: getAllSubAdmins,
                totalCount: totalCount,
            })
        } catch (error) {
            console.log("Error getallSubadmin error -", error);
        }
    }

    async getOneSubadmin(req, res) {
        try {

            const { id } = req.body
            var subid = new ObjectId(id)

            if (id == "" || id == null) {
                return res.send({ status: false, msg: "Please Enter Id", data: [] })
            }


            const getAllSubAdmins = await User_model.find({ _id: subid, Role: "SUBADMIN" });


            // IF DATA NOT EXIST
            if (getAllSubAdmins.length == 0) {
                return res.send({ status: false, msg: "Empty data", data: [] })
            }

            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get  Subadmins",
                data: getAllSubAdmins,

            })
        } catch (error) {
            console.log("Error get Subadmin error -", error);
        }
    }


    async getallSubadminClients(req, res) {
        try {

            // GET LOGIN CLIENTS
            const getAllSubAdmins = await User_model.find({
                parent_role: "SUBADMIN",
                license_type: "2",
                Is_Active: '0'

            });
            const totalCount = getAllSubAdmins.length;

            // IF DATA NOT EXIST
            if (getAllSubAdmins.length == 0) {
                return res.send({ status: false, msg: "Empty data", data: [], totalCount: totalCount, })
            }

            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get All Subadmins",
                data: getAllSubAdmins,
                totalCount: totalCount
            })

        } catch (error) {
            console.log("Error getallSubadmin error -", error);
        }
    }
}


module.exports = new Subadmin();