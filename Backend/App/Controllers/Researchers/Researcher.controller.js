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
const strategy = db.Strategies
const Stg_Collaborators = db.Stg_Collaborators;

const { CommonEmail } = require("../../Helpers/CommonEmail");
const { firstOptPass } = require("../../Helpers/Email_formate/first_login");


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
                Balance: req.body.Balance,
                broker: 2,
            });

            // Save new user and count licenses
            const savedUser = await newUser.save();

            const count_licenses_add = new count_licenses({
                user_id: savedUser._id,
                Role: "RESEARCH",
                admin_id: req.body.user_id,
                Balance: req.body.Balance,
                Mode: "CASH"
            });
            await count_licenses_add.save();


            res.status(200).send({
                status: true,
                msg: "Successfully added!",
                data: { UserId: savedUser.user_id },
            });

            var toEmail = Email;
            var subjectEmail = "User ID and Password";
            var email_data = {
                FullName: req.body.FullName,
                Email: Email,
                Password: Password,
            };

            var EmailData = await firstOptPass(email_data);
            CommonEmail(toEmail, subjectEmail, EmailData);
        } catch (error) {
            return res.send({ status: false, msg: "Server side error" });
        }

    }

    async UpdateResearcher(req, res) {

        try {
            const { id, FullName, Password, Strategy_percentage_to_researcher, Balance } = req.body

            const findData = await User_model.find({ _id: id })

            if (!findData) {
                return res.send({ status: false, msg: "Researcher Does Not Exit", data: [], })
            }

            const Researcher = {
                FullName: FullName,
                Password: Password,
                Balance: Balance,
                Strategy_percentage_to_researcher: Strategy_percentage_to_researcher
            }

            await User_model.findByIdAndUpdate(findData[0]._id, Researcher);
            return res.send({ status: true, msg: "Researcher Update successfully", data: [] })

        }
        catch (error) {
            res.send({ msg: "Error=>", error });
        }
    }

    async GetAllResearcher(req, res) {
        const { id } = req.body

        try {
            const AllData = await User_model.find({ parent_id: id, Role: "RESEARCH" }).sort({ createdAt: -1 })



            return res.send({
                status: true,
                msg: "Get All Data Successfully",
                data: AllData,
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
    async UpdateResearcherBalance(req, res) {
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
            return res.send({ status: false, msg: "Internal server error" });
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
    //Add strategy 
    async createStrategy(req, res) {
        try {

            const {
                strategy_name,
                strategy_description,
                strategy_demo_days,
                strategy_category,
                strategy_segment,
                strategy_indicator,
                strategy_tester,
                strategy_amount,
                strategy_image,
                maker_id,
                max_trade,
                strategy_percentage,
                Role,
                security_fund,
                monthly_charges,

            } = req.body;
            if (!maker_id || maker_id == "" || maker_id == null) {
                return res.send({
                    status: false,
                    msg: "Please Enter Maker Id",
                    data: [],
                });
            }

            const maker_id_find = await User_model.findOne({
                _id: maker_id,
                Role: Role
            });


            if (!maker_id_find) {
                return res.send({ status: false, msg: "Maker Id Is Wrong", data: [] });
            }

            const exist_strategy = await researcher_strategy.findOne({
                strategy_name: strategy_name,
            });

            if (exist_strategy) {
                return res.send({
                    status: false,
                    msg: "Strategy already exists",
                    data: [],
                });
            }


            // Check if the length of the string is at least 5 characters (to have 4th index)
            if (strategy_name.length < 5) {
                return res.send({
                    status: false,
                    msg: "Please Enter Strategy name long",
                    data: [],
                });
            }
            // Check if the first three letters are capitalized
            if (
                strategy_name.substring(0, 3) !==
                strategy_name.substring(0, 3).toUpperCase()
            ) {
                return res.send({
                    status: false,
                    msg: "Please Enter Strategy starting 3 letter Capital",
                    data: [],
                });
            }


            // Check if there is an underscore (_) at the fourth index
            if (strategy_name.charAt(3) != "_") {
                return res.send({
                    status: false,
                    msg: "Please Enter Strategy name _ is mandatory",
                    data: [],
                });
            }
            if (maker_id_find.prifix_key != strategy_name.substring(0, 3).toUpperCase()) {
                return res.send({
                    status: false,
                    msg: "Please Enter Strategy starting 3 leter is your Prefix Key letter",
                    data: [],
                });
            }
            var strategy_Data = new researcher_strategy({
                strategy_name: strategy_name,
                strategy_description: strategy_description,
                strategy_demo_days: strategy_demo_days,
                strategy_category: strategy_category,
                strategy_segment: strategy_segment,
                strategy_indicator: strategy_indicator,
                strategy_tester: strategy_tester,
                strategy_amount: strategy_amount,
                strategy_image: strategy_image,
                maker_id: maker_id_find._id,
                max_trade: max_trade || null,
                strategy_percentage: strategy_percentage || null,
                security_fund: security_fund,
                monthly_charges: monthly_charges,
            });


            strategy_Data.save()
                .then(async (data) => {
                    return res.status(200).json({ status: true, msg: "Strategy Add successfully!", data: strategy_Data._id });
                })
                .catch((err) => {
                    console.log(" Error Add Time Error-", err);
                    if (err.keyValue) {
                        return res.send({
                            status: false,
                            msg: "Key duplicate",
                            data: err.keyValue,
                        });
                    }
                });
        } catch (error) {
            console.log("Error Strategy add error -", error.keyValue);
        }


    }

    // EDIT STRATEGY IN A COLLECTION
    async EditResearcherStragegy(req, res) {
        try {
            const {
                _id,
                strategy_name,
                strategy_description,
                strategy_demo_days,
                strategy_category,
                strategy_segment,
                strategy_indicator,
                strategy_tester,
                strategy_amount,
                strategy_image,
                maker_id,
                Service_Type,
                max_trade,
                strategy_percentage,
                Role,
                security_fund,
                monthly_charges,
            } = req.body;




            if (!_id || _id == "" || _id == null) {
                return res.send({ status: false, msg: "Please Enter Id", data: [] });
            }

            const strategy_check = await researcher_strategy.findOne({ _id: _id });
            if (!strategy_check) {
                return res.send({ status: false, msg: "Strategy Not exist", data: [] });
            }

            if (!maker_id || maker_id == "" || maker_id == null) {
                return res.send({
                    status: false,
                    msg: "Please Enter Maker Id",
                    data: [],
                });
            }

            const maker_id_find = await User_model.findOne({
                _id: maker_id,
                Role: Role,
            });
            if (!maker_id_find) {
                return res.send({ status: false, msg: "Maker Id Is Wrong", data: [] });
            }

            function checkStringValidity(strategy_name) {
                // Check if the length of the string is at least 5 characters (to have 4th index)
                if (strategy_name.length < 5) {
                    return res.send({
                        status: false,
                        msg: "Please Enter Strategy name long",
                        data: [],
                    });
                }

                // Check if the first three letters are capitalized
                if (
                    strategy_name.substring(0, 3) !==
                    strategy_name.substring(0, 3).toUpperCase()
                ) {
                    return res.send({
                        status: false,
                        msg: "Please Enter Strategy starting 3 letter Capital",
                        data: [],
                    });
                }

                // Check if there is an underscore (_) at the fourth index
                if (strategy_name.charAt(3) != "_") {
                    return res.send({
                        status: false,
                        msg: "Please Enter Strategy name _ is mandatory",
                        data: [],
                    });
                }
                if (
                    maker_id_find.prifix_key !=
                    strategy_name.substring(0, 3).toUpperCase()
                ) {
                    return res.send({
                        status: false,
                        msg: "Please Enter Strategy starting 3 leter is your priPrefix Key fix letter",
                        data: [],
                    });
                }
                return true;
            }

            if (!checkStringValidity(strategy_name)) {
                return res.send({
                    status: false,
                    msg: "Some Issue in strategy",
                    data: [],
                });
            }

            try {
                // CHECK IF SAME STRATEGY AONOTHER STRATEG NAME TO SIMLER MATCH
                const strateg_data = await researcher_strategy.find({
                    $and: [{ strategy_name: strategy_name }, { _id: { $ne: _id } }],
                });

                if (strateg_data.length > 0) {
                    return res.send({
                        status: false,
                        msg: "Strategy Name Already Exist",
                        data: [],
                    });
                }
            } catch (error) {
                console.log("Error error", error);
            }

            const filter = { _id: _id };
            const update_strategy = {
                $set: {
                    strategy_name: strategy_name,
                    strategy_description: strategy_description,
                    strategy_demo_days: strategy_demo_days,
                    strategy_category: strategy_category,
                    strategy_segment: strategy_segment,
                    strategy_indicator: strategy_indicator,
                    strategy_tester: strategy_tester,
                    strategy_amount: strategy_amount,
                    strategy_image: strategy_image,
                    security_fund: security_fund,
                    monthly_charges: monthly_charges,
                    maker_id: maker_id_find._id,
                    Service_Type: Service_Type,
                    max_trade: max_trade || null,
                    strategy_percentage: strategy_percentage || null
                },
            };

            // UPDATE STRATEGY INFORMATION
            const result = await researcher_strategy.updateOne(filter, update_strategy);

            if (!result) {
                return res.send({ status: false, msg: "Strategy not Edit", data: [] });
            }

            return res
                .status(200)
                .json({
                    status: true,
                    msg: "Strategy Edit successfully!",
                    data: result,
                });
        } catch (error) {
            console.log("Error Strategy Edit error -", error);
        }
    }



    // DELETE STRATEGY IN A COLLECTION
    async DeleteResearcherStrategy(req, res) {
        try {
            const { _id } = req.body;

            // CHECK IF STRATEGY EXISTS
            const strategy_check = await researcher_strategy.findOne({ _id: _id });



            if (!strategy_check) {
                return res.send({
                    status: false,
                    msg: "Strategy does not exist",
                    data: [],
                });
            }


            // CHECK IF STRATEGY EXISTS IN STRATEGY CLIENT
            const strategy_client_check = await strategy.findOne({
                strategy_id: _id,
            });
            if (strategy_client_check) {
                return res.send({
                    status: false,
                    msg: "It cannot be deleted because it is assigned to a client.",
                    data: [],
                });
            }

            // Delete the strategy
            const deleteResult = await researcher_strategy.deleteOne({ _id: _id });
            if (deleteResult.deletedCount === 1) {
                return res
                    .status(200)
                    .send({
                        status: true,
                        msg: "Strategy deleted successfully!",
                        data: [],
                    });
            } else {
                return res
                    
                    .send({ status: false, msg: "Error deleting strategy", data: [] });
            }
        }
        catch (error) {
            console.log("Error Delete Strategy Error:", error);
            return res
                
                .send({ status: false, msg: "An error occurred", data: [] });
        }
    }

    // GET ONE STRATEGY IN A COLLECTION
    async GetStragegyById(req, res) {
        try {
            const { id } = req.body;

            const exist_strategy = await researcher_strategy.findOne({ _id: id });
            if (!exist_strategy) {
                return res.send({
                    status: false,
                    msg: "Strategy Not exists",
                    data: [],
                });
            }

            return res
                .status(200)
                .json({
                    status: true,
                    msg: "Strategy Get successfully!",
                    data: exist_strategy,
                });
        } catch (error) {
            console.log("Error Strategy Get One error -", error.keyValue);
        }
    }
    // GET ALL STRATEGYS
    async GetAllResearcherStrategy(req, res) {
        try {
            const { page, id } = req.body;


            // var getAllTheme = await strategy_model.find()
            const getAllstrategy = await researcher_strategy.find({ maker_id: id }).sort({ createdAt: -1 })
                .select('_id strategy_name strategy_description strategy_demo_days  strategy_percentage max_trade strategy_category strategy_segment strategy_image monthly_charges security_fund maker_id createdAt updatedAt __v');

            // IF DATA NOT EXIST
            if (getAllstrategy.length == 0) {
                res.send({ status: false, msg: "Empty data", data: getAllstrategy });
                return;
            }
            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get All Startegy",
                data: getAllstrategy,
            });
        } catch (error) {
            console.log("Error Get All Strategy Error-", error);
        }
    }

    // GET ALL STRATEGY USERS
    async GetAllStrategyUsers(req, res) {
        try {
            const { id } = req.body;

            const pipeline = [
                {
                    $match: { "maker_id": new ObjectId(id) }
                },
                {
                    $unwind: "$collaboration_id"
                },
                {
                    $addFields: {
                        dynamicKey: {
                            $concat: ["$strategy_name", "_", { $toString: "$collaboration_id" }]
                        }
                    }
                },
                {
                    $lookup: {
                        from: "strategies",
                        localField: "dynamicKey",
                        foreignField: "stgname_adminid",
                        as: "strategy"
                    }
                },
                {
                    $unwind: "$strategy"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "strategy.maker_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $lookup: {
                        from: "strategy_clients",
                        localField: "strategy._id",
                        foreignField: "strategy_id",
                        as: "stg_count"
                    }
                },
                {
                    $lookup: {
                        from: "strategy_orders",
                        let: { strategyName: "$strategy_name", admin_id: "$strategy.maker_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$strategy_name", "$$strategyName"] },
                                            { $eq: ["$user_id", "$$admin_id"] },
                                            { $eq: ["$order_status", "Success"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "stg_order"
                    }
                },
                {
                    $unwind: "$stg_order"
                },


                {
                    $group: {
                        _id: "$_id",
                        strategy_name: { $first: "$strategy_name" },
                        createdAt: { $first: "$createdAt" },


                        // stg_order: { $push: "$stg_order.amount" },
                        strategy_category: { $first: "$strategy_category" },
                        strategy_segment: { $first: "$strategy_segment" },
                        strategy: {
                            $push: {
                                stg_id: "$strategy._id",
                                strategy_name: "$strategy.strategy_name",
                                maker_id: "$strategy.maker_id",
                                createdAt: "$strategy.createdAt",
                                Username: "$user.UserName",
                                stg_count: { $size: "$stg_count" },
                                purchase_type: "$strategy.purchase_type",
                                End_Date: "$strategy.End_Date",
                                ActiveStatus: "$strategy.ActiveStatus",
                                Amount: "$stg_order.amount"
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        strategy_name: 1,
                        createdAt: 1,
                        End_Date: 1,
                        ActiveStatus: 1,
                        strategy_category: 1,
                        strategy_segment: 1,
                        strategy: 1,
                        stg_order: 1
                    }
                },
                {
                    "$sort": { "createdAt": -1 }
                }
            ];

            // Executing the aggregation pipeline
            const getAllstrategy = await researcher_strategy.aggregate(pipeline);


            // IF DATA NOT EXIST
            if (getAllstrategy.length == 0) {
                res.send({ status: false, msg: "Empty data", data: getAllstrategy });
                return;
            }
            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get All Startegy",
                data: getAllstrategy,
            });
        } catch (error) {
            console.log("Error Get All Strategy Error-", error);
        }
    }


    // GET ALL STRATEGY USERS
    async GetAllCollaNAme(req, res) {
        try {
            const { id } = req.body;


            const pipeline = [
                {
                    $match: { researcher_id: new ObjectId(id) }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'Collaborators_id',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $unwind: '$userDetails'
                },
                {
                    $lookup: {
                        from: 'strategies',
                        let: { researcherId: new ObjectId(id), makerId: '$Collaborators_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$researcher_id', '$$researcherId'] },
                                            { $eq: ['$maker_id', '$$makerId'] },
                                            { $ne: ['$purchase_type', "monthlyPlan"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: 'strategy_transactions',
                                    let: { strategyId: '$_id', adminId: '$Collaborators_id' },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ['$strategy_id', '$$strategyId'] },
                                                        { $ne: ['$Research_charge', null] }
                                                    ]
                                                }
                                            }
                                        }
                                    ],
                                    as: 'transactionDetails'
                                }
                            },
                            {
                                $addFields: {
                                    totalResearchCharges: {
                                        $reduce: {
                                            input: '$transactionDetails',
                                            initialValue: 0,
                                            in: {
                                                $add: [
                                                    '$$value',
                                                    { $toDouble: { $ifNull: ['$$this.Research_charge', 0] } }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        ],
                        as: 'strategies'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        Collaborators_id: 1,
                        researcher_id: 1,
                        total_amount: 1,
                        UserName: '$userDetails.UserName',
                        createdAt: 1,
                        strategies: {
                            $map: {
                                input: '$strategies',
                                as: 'strategy',
                                in: {
                                    strategy_name: '$$strategy.strategy_name',
                                    Research_charges: '$$strategy.totalResearchCharges'
                                }
                            }
                        }
                    }
                }
            ];




            // Executing the aggregation pipeline
            const GetAllColebra = await Stg_Collaborators.aggregate(pipeline);




            // IF DATA NOT EXIST
            if (GetAllColebra.length == 0) {
                res.send({ status: false, msg: "Empty data", data: GetAllColebra });
                return;
            }
            // DATA GET SUCCESSFULLY
            res.send({
                status: true,
                msg: "Get All Startegy",
                data: GetAllColebra,
            });
        } catch (error) {
            console.log("Error Get All Strategy Error-", error);
        }
    }

    async AddAmountInCollabra(req, res) {
        try {
            const { id, Balance } = req.body;

            // Validate request data
            if (!id || !Balance) {
                return res.send({ status: false, msg: "Invalid request data", data: [] });
            }

            // Find the existing collaborator
            const existingCollaborator = await Stg_Collaborators.findOne({ _id: new ObjectId(id) });

            // Check if the collaborator exists
            if (!existingCollaborator) {
                return res.status(404).send({ status: false, msg: "Collaborator not found", data: [] });
            }

            // Calculate the new total amount
            let Exist_amount = existingCollaborator.total_amount || 0;
            Exist_amount += parseInt(Balance);

            // Update the collaborator record
            const collaboratorUpdate = {
                $set: { total_amount: Exist_amount }
            };

            await Stg_Collaborators.updateOne({ _id: existingCollaborator._id }, collaboratorUpdate, { upsert: true });

            // Send success response
            return res.send({
                status: true,
                msg: "Update Successfully",
                data: [],
            });
        } catch (error) {
            console.log("Error updating collaborator amount:", error);
            return res.send({ status: false, msg: "Internal server error", data: [] });
        }
    }


    async UpdateStrategyStatus(req, res) {
        try {
            const { id, status } = req.body;

            // Validate request data
            if (!id || !status) {
                return res.send({ status: false, msg: "Invalid request data", data: [] });
            }


            // Update the collaborator record
            const collaboratorUpdate = {
                $set: { ActiveStatus: status }
            };

            await strategy.updateOne({ _id: new ObjectId(id) }, collaboratorUpdate);

            // Send success response
            return res.send({
                status: true,
                msg: "Update Successfully",
                data: [],
            });
        } catch (error) {
            console.log("Error updating collaborator amount:", error);
            return res.send({ status: false, msg: "Internal server error", data: [] });
        }
    }


}



module.exports = new Researcher();