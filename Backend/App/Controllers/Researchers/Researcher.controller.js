"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../../Models");
const User_model = db.user;
const Role_modal = db.role;
var dateTime = require("node-datetime");
var dt = dateTime.create();



class Researcher {
    async AddResearcher(req, res) {
        try {
            const { prifix_key, PhoneNo, Email, UserName, Password } = req.body;

            const Role = "RESEARCH";

            // Check if role exists
            const roleCheck = await Role_modal.findOne({ name: Role.toUpperCase() });
            if (!roleCheck) {
                return res.send({ status: false, msg: "Role does not exist" });
            }

            // Check if username, email, phone number, and prefix key already exist
            const searchQuery = {
                $or: [
                    { prifix_key: prifix_key },
                    { PhoneNo: PhoneNo },
                    { Email: Email },
                    { UserName: UserName }
                ]
            };

            console.log("prefix_key :", prifix_key)
            const existingUser = await User_model.findOne(searchQuery);

            if (existingUser) {
                if (existingUser.Email === Email) {
                    return res.send({ status: false, msg: "Email already exists" });

                }
                if (existingUser.PhoneNo === PhoneNo) {
                    return res.send({ status: false, msg: "PhoneNo already exists" });

                }
                if (existingUser.UserName === UserName) {
                    return res.send({ status: false, msg: "UserName already exists" });

                }
                if (existingUser.prifix_key === prifix_key) {
                    return res.send({ status: false, msg: "prefix_key already exists" });
                }
            }

            

            let hashedPassword;
            if (Password) {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(Password.toString(), salt);
            }

            // Generate client key
            const mins = 1;
            const maxs = 1000000;
            const randNum = mins + Math.random() * (maxs - mins);
            const cli_key = Math.round(randNum);
            const ccd = dt.format("ymd");
            const client_key = prifix_key + cli_key + ccd;

            // Create new user instance
            const newUser = new User_model({
                profile_img: req.body.profile_img || "",
                FullName: req.body.FullName,
                UserName: UserName,
                Email: Email,
                PhoneNo: PhoneNo,
                Password: hashedPassword,
                Otp: Password,
                Role: Role.toUpperCase(),
                prifix_key: prifix_key.toUpperCase(),
                client_key: client_key,
                parent_role: "ADMIN",
                parent_id: req.body.user_id,
                Is_First_login: "1",
                Strategy_percentage_to_researcher: req.body.Strategy_percentage_to_researcher,
                Balance: req.body.Balance
            });

            // Save new user and count licenses
            const savedUser = await newUser.save();

            return res.status(200).send({
                status: true,
                msg: "Successfully added!",
                data: { UserId: savedUser.user_id },
            });
        } catch (error) {
            console.log(error, "Server side Error");
            return res.send({ status: false, msg: "Server side error" });
        }

    }


}

module.exports = new Researcher();