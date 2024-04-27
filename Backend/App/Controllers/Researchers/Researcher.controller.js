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



class Researcher {

    async AddResearcher(req, res) {
        try {
            const { PhoneNo, Email, UserName, Password } = req.body;

            const Role = "RESEARCH";



            async function generateUniquePrefix() {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let prefix = '';

                // Retrieve all existing prefix keys from the database
                const existingPrefixKeys = (await User_model.find().select('prefix_key')).map(user => user.prefix_key);

                // Generate a new prefix key until it's unique
                do {
                    prefix = '';
                    for (let i = 0; i < 3; i++) {
                        const randomIndex = Math.floor(Math.random() * alphabet.length);
                        prefix += alphabet[randomIndex];
                    }
                } while (existingPrefixKeys.includes(prefix)); // Check if the generated prefix is already in use

                return prefix;
            }

            // Example usage:
            const prifix_key = await generateUniquePrefix();

            if (prifix_key.length > 3) {
                return res.send({ status: false, msg: "prifix_key Omly 3 Digits" });
            }


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



    async GetAllResearcher(req, res) {
        const { id } = req.body

        try {
            const AllData = await User_model.find({ parent_id: id, Role: "RESEARCH" })
          
            const aggregateResult = await User_model.aggregate([
                { $match: { parent_id: id, Role: "RESEARCH" } }, 
                {
                    $group: {
                        _id: null,
                        totalBalance: { $sum: { $toDouble: "$Balance" } },
                        totalCount: { $sum: 1 }, 
                        activeCount: {
                            $sum: {
                                $cond: { if: { $eq: ["$ActiveStatus", "1"] }, then: 1, else: 0 }
                            }
                        }
                    }
                },
                { $sort: { createdAt: -1 } } 
            ]);


            return res.send({
                status: true,
                msg: "Get All Data Successfully",
                data: AllData,
                count: aggregateResult[0]
            })

        }
        catch (error) {
            console.log("Error to fetch data", error)
            return res.send({
                status: false,
                msg: "Error to fetch data",
                data: []
            })

        }

    }



    async addResearcherupdate(req, res) {
        try {
            const { _id, Balance, parent_id } = req.body


            const get_user = await User_model.find({ _id: _id, Role: "RESEARCH" });

            if (get_user.length == 0) {
                return res.send({
                    status: false,
                    msg: "Empty data",
                    data: [],
                });
            }
            const filter = { _id: _id };
            const updatedBalance =
                isNaN(get_user[0].Balance) || get_user[0].Balance === ""
                    ? Number(Balance)
                    : Number(Balance) + Number(get_user[0].Balance);

            const updateOperation = {
                $set: { Balance: updatedBalance },
            };


            const result = await User_model.updateOne(filter, updateOperation);


            const count_licenses_add = new count_licenses({
                user_id: _id,
                Role: "RESEARCH",
                admin_id: parent_id,
                Balance: Balance,
                Mode: "CASH"
            });
            await count_licenses_add.save();

            if (!result) {
                return res.send({ status: false, msg: "Data not updated", data: [] });
            }

            return res.send({
                status: true,
                msg: "Data updated",
                data: result,
            });
        } catch (error) {
            console.error("Internal error:", error);
            return res.status(500).send({ status: false, msg: "Internal server error" });
        }
    }
    async DeleteResearcher(req, res) {
        try {
            const { id } = req.body
            const findData = await User_model.findOne({ _id: id })
            if (!findData) {
                return res.send({
                    status: false,
                    msg: "Researcher not found",
                    data: []
                })
            }
            const DeleteResearcher = await User_model.deleteOne({ _id: id });
            const deletelicenseCount = await count_licenses.deleteMany({ _id: id });
            if (DeleteResearcher.deletedCount === 1) {
                return res.send({
                    status: true,
                    msg: "Researcher delete successfully",
                    data: [],
                })
            }
        }
        catch (err) {
            return res.send({
                status: false,
                msg: "Id not found",
                data: [],
            })
        }
    }
}

module.exports = new Researcher();